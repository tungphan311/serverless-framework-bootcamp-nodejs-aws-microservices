import AWS from "aws-sdk";
import middy from "@middy/core";
import jsonParser from "@middy/http-json-body-parser";
import eventNormalizer from "@middy/http-event-normalizer";
import errorHandler from "@middy/http-error-handler";
import createError from "http-errors";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  try {
    const results = await dynamoDB
      .scan({
        TableName: process.env.AUCTIONS_TABLE_NAME,
      })
      .promise();

    auctions = results.Items;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auctions),
  };
}

export const handler = middy(getAuctions)
  .use(jsonParser())
  .use(eventNormalizer())
  .use(errorHandler());
