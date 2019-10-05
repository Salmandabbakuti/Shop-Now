 function log(message) {
    $('#log').append($('<p>').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 1000);
      }
    });
  }
function initProducts() {
    shopnow.getProductsLength((err, maxProducts) => {
        let sectionContent = ''
        maxProducts = maxProducts.toNumber()
        for(let i = 0; i < maxProducts; i++) {
            shopnow.allProducts(i, (err, message) => {
                sectionContent += `<div class="message-box">
                    <div>ProductId: ${message[0]}</div>
                    <div>Name: ${message[1]}</div>
                    <div>Category: ${message[2]}</div>
                     <div>Price: ${message[3]/1000000000000000000} ETH</div>
                      <div>Description: ${message[4]}</div>
                       <div>Seller: ${message[5]}</div>
                </div>`

                if(i === maxProducts - 1) document.querySelector('#allProducts').innerHTML = sectionContent
            })
        }
    })
}
function initMyOrders() {
    shopnow.getMyOrdersLength((err, maxOrders) => {
        let sectionsContent = ''
        maxOrders = maxOrders.toNumber()
        for(let i = 0; i < maxOrders; i++) {
            shopnow.myOrders(i, (err, order) => {
                sectionsContent += `<div class="message-box">
                    <div>ProductId: ${order[0]}</div>
                    <div>Order Status: ${order[1]}</div>
                    <div>PurchaseId: ${order[2]}</div>
                     <div>Shipment Status: ${order[3]}</div>
                </div>`

                if(i === maxOrders - 1) document.querySelector('#allOrders').innerHTML = sectionsContent
            })
        }
    })
}
 const address = "0x250FfeC3fD6Eea15c281470F91f4E063839D5F8D";
  const abi = [{"constant":true,"inputs":[],"name":"getProductsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"sellerSignUp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"}],"name":"buyProduct","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_purchaseId","type":"uint256"},{"name":"_shipmentDetails","type":"string"}],"name":"updateShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentProductId","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_productName","type":"string"},{"name":"_category","type":"string"},{"name":"_price","type":"uint256"},{"name":"_description","type":"string"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"sellers","outputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"bankGuaraantee","type":"uint256"},{"name":"bgPaid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyOrdersLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_purchaseId","type":"uint256"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getOrdersPlaced","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOrdersPlacedLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentOrderedBy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_deliveryAddress","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allProducts","outputs":[{"name":"productId","type":"string"},{"name":"productName","type":"string"},{"name":"Category","type":"string"},{"name":"price","type":"uint256"},{"name":"description","type":"string"},{"name":"seller","type":"address"},{"name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_purchaseId","type":"uint256"}],"name":"refund","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_purchaseId","type":"uint256"}],"name":"getShipmentStatus","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"myOrders","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  shopnow = web3.eth.contract(abi).at(address);
  $(function () {
    var shopnow;
    $('#createAccount').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      shopnow.createAccount.sendTransaction(document.getElementById("name").value, document.getElementById("email").value, document.getElementById("deliveryAddress").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Account Created. Start Having Fun..");
        });
      });
    });
$('#buyProduct').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      shopnow.buyProduct.sendTransaction(document.getElementById("buyProductId").value, {value: window.web3.toWei(document.getElementById("buyAmount").value,'ether')}, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Order Placed. Go to My orders in Your Profile..");
        });
      });
    });
    $('#cancelOrder').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
      log("Transaction On its Way...");
      shopnow.cancelOrder.sendTransaction(document.getElementById("cancelProductId").value, document.getElementById("cancelPurchaseId").value, function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Your Order has been Canceled...");
        });
      });
    });
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 3) {
        error("Wrong network detected. Please switch to the Ropsten test network.");
      } else {
        log("Connected to the Ropsten test network.");
        shopnow = web3.eth.contract(abi).at(address);
        $('#productListings').click();
        }
    }
  });
