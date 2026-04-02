export const STRINGS = {
  LOGIN: {
    TITLE: 'Login',
    SUBTITLE: 'Log in to manage your tasks and stay productive.',
    STEP: 'Step 1 of 2',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Enter email',
    PASSWORD_LABEL: 'Password',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    FORGOT_PASSWORD: 'Forgot Password?',
    TRUST_DEVICE: 'Trust this device for 7 days',
    BUTTON: 'Login',
    IMG_ALT: 'Dashboard Preview',
    ERRORS: {
      EMAIL_REQUIRED: 'Please enter your email address to log in.',
      EMAIL_INVALID: 'Oops! This email address doesn\'t look quite right.',
      PASSWORD_REQUIRED: 'Please enter your password to continue.'
    }
  },
  FORGOT_PASSWORD: {
    TITLE: 'Forgot password?',
    SUBTITLE: "We'll send you a verification code to this email.",
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Enter your email',
    BUTTON: 'Submit',
    BACK: 'Back'
  },
  VERIFICATION: {
    TITLE_LOGIN: 'Secure Your Account',
    TITLE_FORGOT: 'Verification',
    SUBTITLE: 'Enter the 6-digit OTP sent to your registered email address to verify your identity.',
    STEP: 'STEP 2 OF 2',
    RESEND_PROMPT: "Didn't receive the code?",
    RESEND_LINK: 'Resend OTP',
    RESEND_TIMER: 'Resend OTP in',
    BUTTON: 'Verify OTP'
  },
  RESET_PASSWORD: {
    TITLE: 'Reset Your Password',
    SUBTITLE: 'Set a new password',
    NEW_PASSWORD_LABEL: 'New Password',
    NEW_PASSWORD_PLACEHOLDER: 'Enter new password',
    CONFIRM_PASSWORD_LABEL: 'Confirm Password',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Re-enter password',
    BUTTON: 'Reset',
    ERRORS: {
      PASSWORD_REQUIRED: 'Password is required.',
      PASSWORD_LENGTH: 'Password must be at least 6 characters.',
      CONFIRM_REQUIRED: 'Please confirm your password.',
      PASSWORDS_MISMATCH: 'Passwords do not match.'
    }
  },
  RESET_SUCCESS: {
    TITLE: 'Your password has been updated successfully',
    BACK: 'Back',
    BUTTON: 'Log in'
  },
  COMPLETE_PROFILE: {
    STEP_1: 'STEP 1 OF 2',
    STEP_2: 'STEP 2 OF 2',
    TITLE: 'Complete Your Profile',
    SUBTITLE: 'This information allows us to customize your profile',
    NAME: {
      LABEL: 'Name',
      PLACEHOLDER: 'Enter your name'
    },
    GENDER: {
      LABEL: 'Gender',
      PLACEHOLDER: 'Select gender',
      OPTIONS: ['Male', 'Female', 'Other']
    },
    PHOTO: {
      LABEL: 'Upload Profile Photo',
      HINT: 'Drop here to attach or upload'
    },
    BIRTH_DATE: {
      LABEL: 'Birth Date',
      PLACEHOLDER: 'Select date'
    },
    PHONE: {
      LABEL: 'Phone number',
      PLACEHOLDER: '000-000-0000'
    },
    HIRING_DATE: {
      LABEL: 'Hiring Date',
      PLACEHOLDER: 'Select hiring date'
    },
    TIMEZONE: {
      LABEL: 'Time Zone',
      PLACEHOLDER: 'Select time zone'
    },
    ADDRESS: {
      LABEL: 'Address',
      PLACEHOLDER: 'Enter full address'
    },
    COUNTRY: {
      LABEL: 'Country',
      PLACEHOLDER: 'Select country'
    },
    STATE: {
      LABEL: 'State',
      PLACEHOLDER: 'Select state'
    },
    CITY: {
      LABEL: 'City',
      PLACEHOLDER: 'Select city'
    },
    ZIP: {
      LABEL: 'ZIP Code',
      PLACEHOLDER: 'Enter ZIP code'
    },
    BUTTONS: {
      BACK: 'Back',
      CONTINUE: 'Continue'
    },
    COMING_SOON: 'Coming Soon',
    BACK_TO_STEP_1: 'Back to Step 1',
    ERRORS: {
      NAME_REQUIRED: 'Name is required',
      NAME_MIN: 'Name must be at least 2 characters',
      GENDER_REQUIRED: 'Gender is required',
      BIRTH_DATE_REQUIRED: 'Birth date is required',
      PHONE_REQUIRED: 'Phone number is required',
      PHONE_INVALID: 'Phone must be 10 digits',
      HIRING_DATE_REQUIRED: 'Hiring date is required',
      TIMEZONE_REQUIRED: 'Time zone is required',
      ADDRESS_REQUIRED: 'Address is required',
      COUNTRY_REQUIRED: 'Country is required',
      STATE_REQUIRED: 'State is required',
      CITY_REQUIRED: 'City is required',
      ZIP_REQUIRED: 'ZIP code is required',
      ZIP_INVALID: 'ZIP code is invalid'
    }
  }
};
