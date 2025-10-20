# Requirements Document

## Introduction

The "Better Call Snoo" game is an Ace Attorney-inspired legal defense game for Reddit's Devvit platform. Players view daily cases, submit creative defenses, and vote on community submissions in a courtroom setting with Reddit's Snoo characters.

## Glossary

- **Daily_Docket_System**: The main hub that displays 5 random cases each day from a predefined list
- **Defense_Submission_Form**: The interface where users input their defense arguments for a selected case
- **Jury_Voting_Screen**: The courtroom interface where community members vote on defense submissions
- **Custom_Post_Creator**: The system that generates new Reddit posts for each defense submission
- **Scales_of_Justice_Display**: The visual representation of live vote percentages
- **Victim_Snoo**: The defendant character sprite with dynamic poses
- **Lawyer_Snoo**: The defense attorney character sprite with dynamic poses
- **Vote_Counter_System**: The backend system that tracks and updates vote tallies in real-time
- **Attorney_Scoring_System**: The system that calculates and tracks scores for defense creators
- **Juror_Scoring_System**: The system that calculates and tracks scores for community voters
- **Leaderboard_System**: The display system that ranks and shows top-performing attorneys and jurors

## Requirements

### Requirement 1

**User Story:** As a Reddit user, I want to see a daily selection of funny legal cases, so that I can choose which case to defend.

#### Acceptance Criteria

1. WHEN the Daily_Docket_System loads, THE Daily_Docket_System SHALL display exactly 5 random cases from a predefined list
2. WHEN a new day begins, THE Daily_Docket_System SHALL refresh the case selection with 5 different random cases
3. THE Daily_Docket_System SHALL present each case with a clear title and crime description
4. WHEN a user selects a case, THE Daily_Docket_System SHALL open the Defense_Submission_Form for that specific case
5. THE Daily_Docket_System SHALL maintain mobile-responsive design without requiring scrolling

### Requirement 2

**User Story:** As a player, I want to submit a creative defense for a case, so that the Reddit community can vote on my argument.

#### Acceptance Criteria

1. WHEN the Defense_Submission_Form opens, THE Defense_Submission_Form SHALL display a single text input field
2. THE Defense_Submission_Form SHALL limit user input to exactly 250 characters
3. WHILE a user types in the defense field, THE Defense_Submission_Form SHALL display a visible character counter
4. WHEN a user clicks submit, THE Custom_Post_Creator SHALL create a new separate Reddit post for that defense
5. THE Defense_Submission_Form SHALL prevent submission if the defense text is empty

### Requirement 3

**User Story:** As a community member, I want to vote on defense submissions, so that I can participate in the jury decision.

#### Acceptance Criteria

1. WHEN a defense post loads, THE Jury_Voting_Screen SHALL display the Victim_Snoo and Lawyer_Snoo with dynamic poses
2. THE Jury_Voting_Screen SHALL present exactly two voting options: "GUILTY" and "NOT GUILTY"
3. WHEN a user clicks a voting button, THE Vote_Counter_System SHALL record the vote and update the tally
4. WHEN a user votes, THE Jury_Voting_Screen SHALL play a gavel sound effect exactly once
5. THE Jury_Voting_Screen SHALL match the provided UI sketch layout exactly

### Requirement 4

**User Story:** As a voter, I want to see live voting results, so that I can understand the community's verdict.

#### Acceptance Criteria

1. WHEN a user completes voting, THE Scales_of_Justice_Display SHALL show live-updating vote percentages
2. THE Scales_of_Justice_Display SHALL visually represent the balance between guilty and not guilty votes
3. WHILE votes are being cast, THE Vote_Counter_System SHALL update percentages in real-time
4. THE Scales_of_Justice_Display SHALL maintain the Ace Attorney-inspired 2D art style
5. THE Jury_Voting_Screen SHALL display vote results without requiring page refresh

### Requirement 5

**User Story:** As a mobile Reddit user, I want the game to work seamlessly on my device, so that I can participate without usability issues.

#### Acceptance Criteria

1. THE Daily_Docket_System SHALL render properly on mobile devices without horizontal scrolling
2. THE Defense_Submission_Form SHALL be fully accessible on mobile screens
3. THE Jury_Voting_Screen SHALL maintain all functionality on mobile devices
4. THE Scales_of_Justice_Display SHALL be clearly visible on mobile screens
5. WHERE a user accesses the game on mobile, THE Daily_Docket_System SHALL provide the same functionality as desktop

### Requirement 6

**User Story:** As a player, I want all visual elements to match the Ace Attorney theme, so that the game feels cohesive and engaging.



#### Acceptance Criteria

1. THE Victim_Snoo and Lawyer_Snoo SHALL be presented as 2D character sprites in a style that mimics the Ace Attorney games.
2. THE Jury_Voting_Screen SHALL use the exact two-panel layout, stylized text boxes, and character poses as shown in the provided FINAL UI SKETCH.jpg.
3. THE Daily_Docket_System SHALL incorporate thematic UI elements, such as case file icons or themed buttons.
4. THE Scales_of_Justice_Display SHALL be animated and styled to fit the game's courtroom aesthetic.
5. ALL buttons and interactive elements throughout the game SHALL use a bold, game-like font and styling consistent with the Ace Attorney theme.


### Requirement 7

**User Story:** As a creator ("Attorney"), I want to be rewarded for writing a winning defense, so that I am motivated to create high-quality, persuasive arguments.

#### Acceptance Criteria

1. WHEN a defense post's 24-hour voting period ends, THE Attorney_Scoring_System SHALL calculate a final score for the Attorney
2. THE Attorney_Scoring_System SHALL calculate the Attorney's score with the formula: (Total 'Not GUILTY' Votes * 2) - (Total 'GUILTY' Votes)
3. IF a defense achieves a majority "Not Guilty" verdict (>50%), THE Attorney_Scoring_System SHALL award a +500 point "Case Won!" bonus
4. THE Leaderboard_System SHALL feature a "Top Attorneys" leaderboard that displays a ranked list of usernames and their total scores
5. THE Attorney_Scoring_System SHALL calculate the Attorney's total score as the sum of scores from all defenses they have submitted

### Requirement 8

**User Story:** As a community member ("Juror"), I want to be rewarded for accurately judging the will of the community, so that I am motivated to vote on many different cases.

#### Acceptance Criteria

1. WHEN a defense post's 24-hour voting period ends, THE Vote_Counter_System SHALL determine the final verdict based on the majority vote
2. IF a Juror's vote matches the final verdict, THE Juror_Scoring_System SHALL award the Juror +10 points
3. IF a Juror's vote does not match the final verdict, THE Juror_Scoring_System SHALL award the Juror 0 points for that case
4. THE Leaderboard_System SHALL feature a "Top Jurors" leaderboard that displays a ranked list of usernames and their total points
5. THE Juror_Scoring_System SHALL calculate the Juror's total score as the sum of points from all cases they have voted on
