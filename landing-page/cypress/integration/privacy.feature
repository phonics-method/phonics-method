Feature: Privacy consent
  I as an apprentice want to turn of tracking so that remain anonymous

  # Rule: Apprentice can reach the privacy policy any time

  Scenario: Apprentice reads the privacy policy on the first load from the banner
    Given they visit the main page for the first time
    When they choose the highlighted privacy policy
    Then they see the privacy policy

  Scenario: Apprentice reads the privacy policy on the front page
    Given they visit the main page after privacy consent
    When they choose the privacy policy
    Then they see the privacy policy

  # Rule: Apprentice cannot reach the content without privacy consent decision

  Scenario: Apprentice can't interact with the content privacy consent decision
    Given they visit the main page for the first time
    When they don't decide on the privacy consent
    Then they can't interact with the rest of the site

