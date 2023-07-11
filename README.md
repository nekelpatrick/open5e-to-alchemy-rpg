# open5e-to-alchemy-rpg

## Alchemy RPG Data Converter

This software is designed to facilitate the conversion of data from various sources into a unified JSON file, which can be seamlessly imported into Alchemy RPG Virtual Tabletop (VTT). This tool is beneficial for game masters and players who want to leverage a variety of data resources in their Alchemy RPG campaigns.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en/download/) installed on your machine.

### Installation

1. Clone this repository to your local machine using `git clone git@github.com:nekelpatrick/open5e-to-alchemy-rpg.git`.
2. Navigate to the project folder in your terminal.
3. Run `npm install` to install all necessary dependencies.

## Running the Software

This software can be executed in two modes: standard and development.

To run the software in standard mode, use the following command:

```bash
npm run start
```
For running the software in development mode, use:

```bash
npm run start:dev
```

How It Works
------------

The software fetches data from several sources, converts and harmonizes this data into a format that is compatible with Alchemy RPG VTT. The output is a single JSON file that can be readily imported into Alchemy RPG VTT.

The conversion process involves mapping the data fetched from each source to align with the Alchemy RPG VTT data schema. This involves fetching, parsing, and reformatting data for each monster or character. Certain fields are also augmented by additional API calls to retrieve related resources, like images.

For more technical details, consult the Alchemy RPG VTT documentation [here](https://alchemyrpg.github.io/slate/#importing-multiple-npcs).

