const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SEND_OTP : BASE_URL + '/auth/send_otp',
    SIGN_UP : BASE_URL + '/auth/sign_up',
    LOG_IN : BASE_URL + '/auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + "/auth/reset_password_token",
    RESET_PASSWORD : BASE_URL + "/auth/reset_password"
}
export const laundry = {
    CREATE_ORDER : BASE_URL + '/laundry/create_order',
    FETCH_ORDER_NUMBER :  BASE_URL + '/laundry/fetch_order_number',
    FETCH_UNDER_WASHING_ORDERS : BASE_URL + '/laundry/fetch_under_washing_orders',
    FETCH_READY_TO_COLLECT_ORDERS : BASE_URL + '/laundry/fetch_ready_to_collect_orders',
    FETCH_COMPLETED_ORDERS : BASE_URL + '/laundry/fetch_completed_orders',
    MAKE_READY_TO_COLLECT : BASE_URL + "/laundry/make_ready_to_collect",
    MAKE_IT_COMPLETED_ORDER : BASE_URL + "/laundry/make_it_completed_order",
    FETCH_STUDENT_ACTIVE_ORDERS : BASE_URL + "/laundry/fetch_student_active_orders",
    FETCH_STUDENT_COMPLETED_ORDERS : BASE_URL + "/laundry/fetch_student_completed_orders",
    PAID_IN_CASH : BASE_URL + "/laundry/paid_in_cash",
    PAID_IN_ONLINE : BASE_URL + "/laundry/paid_in_online",
    FETCH_ORDER_DETAILS : BASE_URL + "/laundry/fetch_order_details"
}
export const cycle = {
    ADD_CYCLE : BASE_URL + "/cycle/add_cycle",
}