const EMAIL_OCCUPIED_ERR_CODE = 'P2002';

const ERROR_MESSSAGES = {
  PRODUCT_NOT_FOUND: 'There is no such product with provided ID',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  EMAIL_OCCUPIED:
    'Provided email address is occupied! Provide another address or enter already existed account!',
  CART_NOT_FOUND: 'There is no cart with such ID.',
  CART_ITEM_NOT_FOUND: 'There is no item with provided ID in your cart for now.',
};

const MODIFY_CART_ACTIONS = {
  ADD: 'add',
  SUBSTRACT: 'substract',
};

export { EMAIL_OCCUPIED_ERR_CODE, ERROR_MESSSAGES, MODIFY_CART_ACTIONS };
