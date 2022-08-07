// Template for render cart modal window on all pages
const cartModal = document.querySelector('#cart-modal');

let modal = `
    <div class="modal fade" id="modal-cart" tabindex="-1" aria-labelledby="cartLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content text-dark">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartLabel">Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="cart-product-list-container cart-container"></div>
                    <hr>
                    <div class="container">
                        <form class="form-contacts">
                            <div class="form-group row">
                                <label for="client-name" class="col-4 col-form-label">Your name:</label>
                                <input class="form-control col-8" type="text" id="client-name" name="name" required>
                            </div>
                            <div class="form-group row">
                                <label for="client-phone" class="col-4 col-form-label">Your phone:</label>
                                <input class="form-control col-8" type="tel" id="client-phone" name="phone"
                                pattern="+380[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" required>
                            <div class="form-group row">
                                <label for="client-email" class="col-4 col-form-label">Your email:</label>
                                <input class="form-control col-8" type="email" id="client-email" name="email" required>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary close-btn" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary order">Order</button>
                </div>
            </div>
        </div>
    </div>
`;

cartModal.innerHTML = modal;