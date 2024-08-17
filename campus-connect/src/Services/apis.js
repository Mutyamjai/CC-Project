const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SEND_OTP : BASE_URL + '/auth/send_otp',
    SIGN_UP : BASE_URL + '/auth/sign_up',
}