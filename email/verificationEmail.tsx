export const verificationTemplate = ({ username, otp }: { username: string, otp: string }) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      
    </head>
    <body>
        <div class="container">
            <h1 class="heading">Email Verification</h1>
            <p class="text">Hello, ${username}!</p>
            <p class="text">
                Your OTP code for verification is: <strong class="otp">${otp}</strong>
            </p>
            <p class="text">
                Please enter this code in the application to complete your registration.
            </p>
            <p class="text">Thank you for joining us!</p>
            <p class="footer">
                If you did not request this email, please ignore it.
            </p>
        </div>
    </body>
    </html>`;
};