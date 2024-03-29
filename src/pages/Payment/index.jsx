import React, { useEffect } from 'react';

function index() {
  useEffect(() => {
    // Load the PayPal JavaScript SDK dynamically
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
    script.async = true;

    script.onload = () => {
      // Render the PayPal button into #paypal-button-container
      window.paypal.Buttons({
        // Call your server to set up the transaction
        createOrder: function (data, actions) {
          return fetch('/demo/checkout/api/paypal/order/create/', {
            method: 'post',
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (orderData) {
              return orderData.id;
            });
        },
        // Call your server to finalize the transaction
        onApprove: function (data, actions) {
          return fetch(
            '/demo/checkout/api/paypal/order/' + data.orderID + '/capture/',
            {
              method: 'post',
            }
          )
            .then(function (res) {
              return res.json();
            })
            .then(function (orderData) {
              // Handle transaction success or failure here
              var errorDetail =
                Array.isArray(orderData.details) && orderData.details[0];

              if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                return actions.restart();
              }

              if (errorDetail) {
                var msg = 'Sorry, your transaction could not be processed.';
                if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                return alert(msg);
              }

              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
              var transaction = orderData.purchase_units[0].payments.captures[0];
              alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

              // Replace the above to show a success message within this page, e.g.
              // const element = document.getElementById('paypal-button-container');
              // element.innerHTML = '';
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  actions.redirect('thank_you.html');
            });
        },
      }).render('#paypal-button-container');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove the PayPal script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Set up a container element for the button */}
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default index;
