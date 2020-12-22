import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  try {
    return async (disptach, getState) => {
      const userId = getState().auth.userId
      const response = await fetch(
        `https://rn-complete-guide-74126.firebaseio.com/orders/${userId}.json`
      )
      //fetch requests are get by default, without adding second configuration object.

      if (!response.ok) {
        //response.ok is true if response is in 200 range, meaning no error
        throw new Error('Something went wrong!')
      }
      const resData = await response.json()
      const loadedOrders = []

      for (const key in resData) {
        loadedProducts.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        )
      }
      dispatch({ type: SET_ORDERS, orders: [] })
    }
  } catch (err) {
    throw err
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const date = new Date()
    const response = await fetch(
      `https://rn-complete-guide-74126.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    )

    const resData = await response.json()
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    })
  }
}
