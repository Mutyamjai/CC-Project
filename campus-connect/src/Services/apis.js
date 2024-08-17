const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SEND_OTP : BASE_URL + '/auth/send_otp',
    SIGN_UP : BASE_URL + '/auth/sign_up',
    LOG_IN : BASE_URL + '/auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + "/auth/reset_password_token",
    RESET_PASSWORD : BASE_URL + "/auth/reset_password"
}