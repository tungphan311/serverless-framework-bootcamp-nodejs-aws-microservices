import middy from "@middy/core";
import jsonParser from "@middy/http-json-body-parser";
import eventNormalizer from "@middy/http-event-normalizer";
import errorHandler from "@middy/http-error-handler";

export default (handler) =>
  middy(handler).use([jsonParser(), eventNormalizer(), errorHandler()]);
