import { useState, useEffect } from "react";
import { CreditCard, Smartphone, Building2, Wallet, Lock, ChevronRight, Check, AlertCircle, MapPin, User, Tag, Package, Shield, Gift, Calendar, Sparkles, Heart, Star } from "lucide-react";

const SacredPaymentPage = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [donation, setDonation] = useState(0);
  const [addDakshina, setAddDakshina] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Sample data
  const savedCards = [
    { id: 1, last4: "4321", type: "VISA", bank: "HDFC Bank" },
    { id: 2, last4: "8765", type: "MASTERCARD", bank: "ICICI Bank" }
  ];

  const banks = [
    { id: 1, name: "State Bank of India", logo: "🏦" },
    { id: 2, name: "HDFC Bank", logo: "🏦" },
    { id: 3, name: "ICICI Bank", logo: "🏦" },
    { id: 4, name: "Axis Bank", logo: "🏦" },
    { id: 5, name: "Kotak Mahindra Bank", logo: "🏦" },
    { id: 6, name: "Punjab National Bank", logo: "🏦" }
  ];

  const cartItems = [
    { id: 1, name: "Sacred Havan Samagri", price: 299, qty: 2, seller: "Divine Store", certified: true },
    { id: 2, name: "Pure Camphor (Kapur)", price: 150, qty: 1, seller: "Puja Essentials", certified: true },
    { id: 3, name: "Incense Sticks Set (Agarbatti)", price: 199, qty: 3, seller: "Spiritual Shop", certified: true }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = 100;
  const deliveryCharges = subtotal > 500 ? 0 : 50;
  const giftWrapCharge = giftWrap ? 25 : 0;
  const dakshinaAmount = addDakshina ? 51 : 0;
  
  // Total calculation
  const total = subtotal - discount + deliveryCharges + parseInt(donation || 0) + dakshinaAmount + giftWrapCharge;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("कृपया भुगतान का तरीका चुनें (Please select a payment method)");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call / Razorpay logic
      setTimeout(() => {
        const orderIdGenerated = `ORD${Date.now()}`;
        setOrderId(orderIdGenerated);
        setShowSuccess(true);
        setLoading(false);
      }, 2000);

      // Note: Actual Razorpay logic is commented out to allow UI testing without API keys
      /* const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: total * 100,
        currency: "INR",
        // ... rest of razorpay options
      };
      const rzp = new window.Razorpay(options);
      rzp.open(); 
      */

    } catch (error) {
      setLoading(false);
      alert("भुगतान विफल रहा। कृपया पुनः प्रयास करें।");
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="text-2xl font-bold">🙏 श्री सनातन पूजा पाठ</div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center border-t-4 border-orange-600">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 आपका आर्डर सफल रहा!</h2>
            <p className="text-xl text-orange-600 mb-1">Order Placed Successfully!</p>
            <p className="text-gray-600 mb-6">धन्यवाद! आपकी पूजा सामग्री जल्द ही आपके पास पहुंचेगी</p>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 mb-6 text-left border border-orange-200">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-orange-200">
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="font-bold text-orange-600">#{orderId}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Amount Paid:</span>
                <span className="font-bold text-2xl text-green-600">₹{total}</span>
              </div>
              {donation > 0 && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Temple Donation:</span>
                  <span className="font-semibold text-orange-600">₹{donation} 🙏</span>
                </div>
              )}
              {dakshinaAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dakshina:</span>
                  <span className="font-semibold text-orange-600">₹{dakshinaAmount}</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Estimated Delivery</span>
              </div>
              <p className="text-sm text-blue-700">Your sacred items will reach you in 3-5 business days</p>
              <p className="text-xs text-blue-600 mt-1">शुभ मुहूर्त में डिलीवरी की व्यवस्था</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <Sparkles className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs text-orange-800 font-medium">Blessed Items</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <Shield className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-green-800 font-medium">100% Authentic</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
              >
                Continue Shopping
              </button>
              <button
                className="flex-1 bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg transition-colors"
              >
                Track Order
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">🕉️ ॐ नमः शिवाय | जय श्री राम 🕉️</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">🙏 श्री सनातन पूजा पाठ</div>
              <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Sacred Shopping</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-xs">100% SECURE & AUTHENTIC</span>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
              <span>LOGIN</span>
            </div>
            <div className="w-8 h-px bg-white bg-opacity-30"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
              <span>ADDRESS</span>
            </div>
            <div className="w-8 h-px bg-white bg-opacity-30"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
              <span>SUMMARY</span>
            </div>
            <div className="w-8 h-px bg-white bg-opacity-30"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-orange-600 font-bold">
                4
              </div>
              <span>PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Panel - Payment Methods */}
          <div className="md:col-span-2 space-y-4">
            {/* Delivery Address Summary */}
            <div className="bg-white rounded-lg shadow-md border border-orange-100">
              <div className="p-4 border-b border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-semibold">1</div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Deliver to:</div>
                    <div className="font-semibold">Home, 110001</div>
                  </div>
                </div>
                <button className="text-orange-600 text-sm font-semibold hover:text-orange-700">CHANGE</button>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg shadow-md border border-orange-100">
              <div className="p-4 border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">2</div>
                  <div className="font-semibold">PAYMENT OPTIONS</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4">
                {/* Payment Method Tabs */}
                <div className="border-r border-orange-100">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`w-full p-4 text-left text-sm flex items-center justify-between ${
                      paymentMethod === "upi" ? "bg-orange-50 border-l-4 border-orange-600 text-orange-600 font-semibold" : "hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>UPI</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPaymentMethod("wallet")}
                    className={`w-full p-4 text-left text-sm flex items-center justify-between ${
                      paymentMethod === "wallet" ? "bg-orange-50 border-l-4 border-orange-600 text-orange-600 font-semibold" : "hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span>Wallets</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-4 text-left text-sm flex items-center justify-between ${
                      paymentMethod === "card" ? "bg-orange-50 border-l-4 border-orange-600 text-orange-600 font-semibold" : "hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Card</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`w-full p-4 text-left text-sm flex items-center justify-between ${
                      paymentMethod === "netbanking" ? "bg-orange-50 border-l-4 border-orange-600 text-orange-600 font-semibold" : "hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>Net Banking</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full p-4 text-left text-sm flex items-center justify-between ${
                      paymentMethod === "cod" ? "bg-orange-50 border-l-4 border-orange-600 text-orange-600 font-semibold" : "hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Cash on Delivery</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Payment Details Panel */}
                <div className="md:col-span-3 p-6">
                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Smartphone className="h-4 w-4 text-orange-600" />
                        <span className="font-semibold">Choose an option</span>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50">
                          <input type="radio" name="upi" className="text-orange-600" defaultChecked />
                          <div>
                            <div className="font-medium text-sm">PhonePe / Google Pay / BHIM UPI</div>
                            <div className="text-xs text-gray-500">Quick UPI payment</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center gap-3 p-3 border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50">
                          <input type="radio" name="upi" className="text-orange-600" />
                          <div className="font-medium text-sm">Your UPI ID</div>
                        </label>
                      </div>

                      <input
                        type="text"
                        placeholder="Enter UPI ID (example@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-3 border-2 border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />

                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50 transition-all shadow-md"
                      >
                        {loading ? "Processing..." : `PAY ₹${total}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="space-y-3">
                      {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik", "Freecharge"].map(wallet => (
                        <label key={wallet} className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50">
                          <div className="flex items-center gap-3">
                            <input type="radio" name="wallet" className="text-orange-600" />
                            <Wallet className="h-5 w-5 text-gray-400" />
                            <span className="font-medium">{wallet}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </label>
                      ))}
                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50 transition-all shadow-md mt-4"
                      >
                        {loading ? "Processing..." : `PAY ₹${total}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      {savedCards.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold mb-3">Saved Cards</div>
                          <div className="space-y-2">
                            {savedCards.map(card => (
                              <label key={card.id} className="flex items-center gap-3 p-3 border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50">
                                <input type="radio" name="saved-card" className="text-orange-600" />
                                <CreditCard className="h-5 w-5 text-gray-400" />
                                <div>
                                  <div className="font-medium text-sm">{card.type} ending in {card.last4}</div>
                                  <div className="text-xs text-gray-500">{card.bank}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t-2 border-orange-100 pt-4">
                        <div className="text-sm font-semibold mb-3">Add New Card</div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={newCard.number}
                            onChange={(e) => setNewCard({...newCard, number: formatCardNumber(e.target.value)})}
                            maxLength={19}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Name on Card"
                            value={newCard.name}
                            onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                            className="w-full p-3 border-2 border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={newCard.expiry}
                              onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                              maxLength={5}
                              className="p-3 border-2 border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <input
                              type="password"
                              placeholder="CVV"
                              value={newCard.cvv}
                              onChange={(e) => setNewCard({...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                              maxLength={3}
                              className="p-3 border-2 border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50 transition-all shadow-md"
                      >
                        {loading ? "Processing..." : `PAY ₹${total}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="space-y-4">
                      <div className="text-sm font-semibold mb-3">Choose your bank</div>
                      <div className="grid grid-cols-2 gap-2">
                        {banks.map(bank => (
                          <button
                            key={bank.id}
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-3 border-2 rounded-lg text-left text-sm hover:border-orange-400 flex items-center gap-2 ${
                              selectedBank === bank.id ? "border-orange-600 bg-orange-50" : "border-orange-200"
                            }`}
                          >
                            <span className="text-xl">{bank.logo}</span>
                            <span>{bank.name}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handlePayment}
                        disabled={loading || !selectedBank}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-lg disabled:opacity-50 transition-all shadow-md"
                      >
                        {loading ? "Processing..." : `PAY ₹${total}`}
                      </button>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <Package className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-sm mb-1">Cash on Delivery</div>
                          <div className="text-xs text-gray-600">Pay when you receive your sacred items</div>
                          <div className="text-xs text-orange-600 mt-1">घर पर भुगतान करें</div>
                        </div>
                      </div>
                      <button
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-lg transition-all shadow-md"
                      >
                        CONFIRM ORDER
                      </button>
                    </div>
                  )}

                  {!paymentMethod && (
                    <div className="text-center py-12 text-gray-400">
                      <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Select a payment method to continue</p>
                      <p className="text-sm mt-2">भुगतान का तरीका चुनें</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Price Details */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-4 border border-orange-100">
              <div className="p-4 border-b border-orange-100">
                <div className="text-gray-700 text-sm uppercase font-semibold">Price Details</div>
              </div>
              
              <div className="p-4 space-y-3 text-sm border-b border-orange-100">
                <div className="flex justify-between">
                  <span>Price ({cartItems.reduce((sum, item) => sum + item.qty, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600 font-semibold">−₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryCharges === 0 ? "text-green-600" : ""}>
                    {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                  </span>
                </div>
                
                {/* Optional Services */}
                <div className="py-2 border-t border-dashed border-orange-100 space-y-2">
                   {/* Dakshina */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={addDakshina} 
                        onChange={(e) => setAddDakshina(e.target.checked)}
                        className="accent-orange-600 h-4 w-4"
                      />
                      <span className="text-gray-700">Add Dakshina (₹51)</span>
                    </div>
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">शुभ</span>
                  </label>

                  {/* Gift Wrap */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={giftWrap} 
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="accent-orange-600 h-4 w-4"
                      />
                      <div className="flex items-center gap-1">
                        <Gift className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-700">Gift Wrap (₹25)</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Donation Section */}
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2 mb-2 text-orange-800">
                    <Heart className="h-3 w-3" />
                    <span className="text-xs font-semibold">Temple Donation (Optional)</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {[11, 21, 51, 101].map(amt => (
                      <button 
                        key={amt}
                        onClick={() => setDonation(amt)}
                        className={`text-xs px-2 py-1 rounded border ${
                          donation === amt 
                          ? "bg-orange-600 text-white border-orange-600" 
                          : "bg-white text-gray-600 border-orange-200 hover:border-orange-400"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter Custom Amount"
                    value={donation || ""}
                    onChange={(e) => setDonation(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded border border-orange-200 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div className="border-t border-dashed border-orange-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 text-xs text-orange-800 rounded-b-lg border-t border-orange-100 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>You will save ₹{discount} on this order</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center p-2 bg-white rounded border border-gray-100 text-center">
                <Shield className="h-5 w-5 text-green-600 mb-1" />
                <span className="text-[10px] text-gray-500">Secure</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-white rounded border border-gray-100 text-center">
                <Star className="h-5 w-5 text-yellow-500 mb-1" />
                <span className="text-[10px] text-gray-500">Top Rated</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-white rounded border border-gray-100 text-center">
                <Check className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-[10px] text-gray-500">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredPaymentPage;