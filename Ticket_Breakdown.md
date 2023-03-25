# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/Estimations, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Assumptions
- We are using a lib for using ORM such as TypeORM.
- There is an API for managing all entities.
- Custom ID is NOT mandatory. We'll use interal id in case Custom Id does not exist.
- We generate unit test for some tickets.
- There are unit tests for both functions.
- There is current documentation about this project and db design.

## Ticket 1: Create AgentsFacilities table

**Estimation:** 1 story point

**Description:**
Create a new table/entity named AgentsFacilities to store the relationship between Agents and Facilities.

**Implementation Details:**
- Create a new model for the AgentsFacilities table and define the appropriate relationships between it, the Agents table, and the Facilities table (Many-to-Many)
- Update the existing API endpoints to include support for creating, updating, and retrieving relationships between Agents and Facilities through the AgentsFacilities table.
- Update database doc.

**Acceptance Criteria:**
- A new table named AgentsFacilities is created with columns for Agent ID, Facility ID, and Custom ID.
- An Agent can be assigned to multiple Facilities with different Custom IDs.
- The AgentsFacilities table can be updated and retrieved using the existing API endpoints for Agents and Facilities.
- Database Doc shows this new table.


## Ticket 2: Update the getShiftsByFacility function to include the custom ids

**Estimation:** 1 story points

**Description:**
Update the getShiftsByFacility method to retrieve all Custom IDs of each Agent of a particular Facility (function parameter)

**Implementation Details:**
- Update the getShiftsByFacility function to include the custom_id of each Agent in the returned Shift metadata
- If custom id does not exist, we use current interal id.
- We update cunrrent unit tests.

**Acceptance Criteria:**
- The getShiftsByFacility function has been updated to include the custom ids of each Agent in the returned Shift metadata
- The function still returns all Shifts worked that quarter for the given Facility id
- The custom_id is only returned if it has been set for the Agent in the database
- The internal_id is only returned if custom id has not been set for the Agent


## Ticket 3: Update report generation function

**Estimation:** 2 story points

**Description:**
Update the report generation function to use the appropriate Custom ID for each Facility.

**Implementation Details:**
- Modify the generateReportfunction to use the Custom ID for each Agent.
- Update the generateReport function to check if a custom_id is available for each Agent in the Shift metadata, otherwise uses internal id.
- We update cunrrent unit tests.

**Acceptance Criteria:**
- The Custom ID is displayed on the Facility's PDF report instead of the internal Agent ID.
- If a custom_id is not available, the internal database id is still used


## Ticket 4: Update Facility API to allow setting Custom IDs for Agents

**Estimation:** 2 story points

**Description:**
Update the Facility API to allow setting Custom IDs for Agents assigned to the Facility

**Implementation Details:**
- Update the existing Facility API to accept a Custom ID parameter for creating or updating Agents.
- Modify the Agents model to update the AgentsFacilities table with the Custom ID for the specified Agent and Facility.
- We generate unit tests for testing this new functionaly.
- We update API doc.

**Acceptance Criteria:**
- The Facility API is updated to accept a Custom ID parameter when creating or updating Agents.
- The Custom ID is saved to the AgentsFacilities table for the specified Agent and Facility.
- API doc shows the new field to be passed.
