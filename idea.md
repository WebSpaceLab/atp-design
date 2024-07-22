# Auth
  ## Register
    - username, firstName, lastName, email, password, confirmPassword
    -[TODO] After registration, a confirmation email is sent.
  >[!WARNING]
>>**There was a problem sending emails to customers.**
    - The user is redirected to the trainer selection panel and waits for verification by the coach or admin.

  ## Login
    - Login with email and password
    - Login via Google Authorization
    - after authorization user is redirected to dashboard
  
# Users: 
  - Create roles: ['admin', 'user', 'coach', 'editor']
  - Create a user panel ('/dashboard/user') only available to the coach (Only visible users assigned to him) and the admin (Visible to all users)

# TODO
Personal form - a form in which the client answers questions about: 
  - their health, 
  - the time they have, 
  - training experience, 
  - what their training goal is
Strength test form - strength test in main exercises at 100%, 85%, 70% 
Performance test form - test in basic exercises / WOD
Endurance test form - test in basic exercises
Fail form - if a training fail occurs, a survey will be triggered
Pain form - a questionnaire to be completed in the event of muscle pain
