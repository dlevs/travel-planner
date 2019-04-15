# API Responses

This directory contains raw response JSON retrieved from the API. This is used for reference, and to automatically generate types.

## Generating types

The [generatedResponseTypes.ts](../generatedResponseTypes.ts) file is generated from the raw JSON files by running `npm run generate-api-types` in the project root.

## JSON file naming

The JSON files are named in a way that will generate good type names. They relate to the following API endpoints:

| Filename                | Endpoint                         |
|-------------------------|----------------------------------|
| StopPoint.json          | `GET /StopPoint/:id`             |
| StopPointArrival.json   | `GET /StopPoint/:id/Arrivals`    |
| StopPointSearch.json    | `GET /StopPoint/Search`          |
| TubeStatus.json         | `GET /line/mode/tube/status`     |
