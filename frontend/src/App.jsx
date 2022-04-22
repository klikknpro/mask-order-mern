import "./App.css";
import http from "axios";
import { useEffect, useState } from "react";
// import Hospital from "./components/Hospital";
import LoadingMask from "./components/LoadingMask";
// import Hospitals from "./temp/Hospitals.json";
// import HospitalDetials from "./components/HospitalDetials";

function App() {
  const [hospitals, setHospitals] = useState(undefined);
  const [selectedHospital, setSelectedHospital] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [comment, setComment] = useState(null);
  const [orders, setOrders] = useState(null);

  const submitOrder = () => {
    http
      .post("http://localhost:4000/api/orders/new_order", {
        partnerId: selectedHospital.id,
        quantity: quantity,
        comment: comment,
      })
      .then(function (response) {
        console.log(response);
        fetchOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchOrders = async () => {
    const response = await http.get("http://localhost:4000/api/orders/all/id", {
      headers: {
        partnerid: selectedHospital.id,
      },
    });
    console.log(response.data);
    setOrders(response.data);
  };

  const fetchHospitals = async () => {
    const response = await http.get("http://localhost:4000/api/partners/all");
    setHospitals(response.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedHospital]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <>
      <h2>FFP2/KN95 maszkok rendelése kórházak részére</h2>
      <p className="description">
        A rendelés megkezdéséhez válaszd ki a megfelelő kórházat a listából:
      </p>
      {hospitals === undefined ? (
        <LoadingMask />
      ) : (
        hospitals.map((hospital) => (
          <>
            <div className="hospitalList">
              <input
                type="radio"
                value={hospital.id}
                name="hospital"
                onChange={() => {
                  setSelectedHospital(hospital);
                }}
              />
              {hospital.name}
            </div>
          </>
        ))
      )}

      <div>------------------------------------------------------------</div>
      {selectedHospital === undefined ? (
        <div>Select a hospital</div>
      ) : (
        <div>
          <p className="description">
            A kiválasztott kórház adatai - elküldés előtt ellenőrizze az adatok
            helyességét:
          </p>
          <div>
            <label htmlFor="hospital" className="hospitalName">
              {selectedHospital.name}
            </label>
          </div>
          <div>
            <label htmlFor="hospital">
              {selectedHospital.address.country_code}
            </label>
          </div>
          <div>
            <label htmlFor="hospital">
              {selectedHospital.address.post_code}
            </label>
          </div>
          <div>
            <label htmlFor="hospital">{selectedHospital.address.city}</label>
          </div>
          <div>
            <label htmlFor="hospital">{selectedHospital.address.address}</label>
          </div>
          <div>
            <label htmlFor="hospital">{selectedHospital.taxcode}</label>
          </div>
          <div>
            ------------------------------------------------------------
          </div>
          <div>
            <p>
              A rendelés adatait itt tudja megadni. A mennyiség megadása
              kötelező!{" "}
            </p>
            <input
              type="number"
              name={selectedHospital.name}
              id={selectedHospital.id}
              placeholder="Quantity"
              required
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Megjegyzés a rendeléshez"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          {/* <div>------------------------------------------------------------</div> */}
          <div>
            <button
              type="submit"
              className="submit"
              disabled={quantity > 0 ? false : true}
              onClick={() => {
                submitOrder();
              }}
            >
              Submit
            </button>
          </div>
          <div>
            ------------------------------------------------------------
          </div>
          {orders === null ? (
            <LoadingMask />
          ) : (
            orders.map((order) => (
              <>
                <div>
                  <h4>Egy korábbi rendelés adatai:</h4>
                  <label htmlFor="hospital">{order.name}</label>
                  <p>Rendelés száma: {order.invoice_number}</p>
                  {/* <label htmlFor="hospital" className="prevord">{order.invoice_number}</label> */}
                  <p>
                    Rendelés összege: {order.gross_total} HUF {order.currency}
                  </p>
                  {/* <label htmlFor="hospital" className="prevord">{order.gross_total} {order.currency}</label> */}
                </div>
              </>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default App;

/* {
  "id": 33551520,
  "invoice_number": "2022-5",
  "type": "invoice",
  "correction_type": "invoice",
  "cancelled": false,
  "block_id": 146322,
  "payment_status": "outstanding",
  "payment_method": "aruhitel",
  "gross_total": 31750,
  "currency": "HUF",
  "conversion_rate": 1,
  "invoice_date": "2022-04-21",
  "fulfillment_date": "2022-04-21",
  "due_date": "2022-05-06",
  "paid_date": "2022-04-21",
  "organization": {
    "name": "Kubis Péter",
    "tax_number": "12345678-1-25",
    "bank_account": {
      "id": 121689,
      "name": "main-account",
      "account_number": "1177301611111018",
      "account_number_iban": "HU42117730161111101800000000",
      "swift": "OTPVHUHB"
    },
    "address": {
      "country_code": "HU",
      "post_code": "3533",
      "city": "Miskolc",
      "address": "Báthori sor 110."
    },
    "small_taxpayer": true,
    "ev_number": "",
    "eu_tax_number": "",
    "cash_settled": false
  },
  "partner": {
    "id": 1746838783,
    "name": "Pécsi Irgalmasrendi Kórház",
    "address": {
      "country_code": "HU",
      "post_code": "7621",
      "city": "Pécs",
      "address": "Széchenyi tér 5."
    },
    "emails": [],
    "taxcode": "18330247-2-02",
    "iban": "",
    "swift": "",
    "account_number": "--",
    "phone": "",
    "general_ledger_number": "",
    "tax_type": "HAS_TAX_NUMBER",
    "custom_billing_settings": {
      "payment_method": null,
      "document_form": null,
      "due_days": null,
      "document_currency": null,
      "template_language_code": null,
      "discount": null
    },
    "group_member_tax_number": "",
    "giro_settings": {
      "giro_default_settings": true,
      "giro_payment_request_enabled": false,
      "giro_different_amount_allowed": false
    }
  },
  "document_partner": {
    "id": 1746838783,
    "name": "Pécsi Irgalmasrendi Kórház",
    "address": {
      "country_code": "HU",
      "post_code": "7621",
      "city": "Pécs",
      "address": "Széchenyi tér 5."
    },
    "emails": [],
    "taxcode": "18330247-2-02",
    "iban": "",
    "swift": "",
    "account_number": "--",
    "phone": "",
    "tax_type": "HAS_TAX_NUMBER"
  },
  "electronic": false,
  "comment": "hozzatok fel lecci",
  "tags": [],
  "notification_status": "none",
  "language": "hu",
  "items": [
    {
      "product_id": 10111622,
      "name": "FFP2/KN95",
      "net_unit_amount": 100,
      "quantity": 250,
      "unit": "db",
      "net_amount": 25000,
      "gross_amount": 31750,
      "vat": "27%",
      "vat_amount": 6750,
      "entitlement": null,
      "comment": ""
    }
  ],
  "summary": {
    "net_amount": 25000,
    "net_amount_local": 25000,
    "gross_amount_local": 31750,
    "vat_amount": 6750,
    "vat_amount_local": 6750,
    "vat_rate_summary": [
      {
        "vat_name": "27%",
        "vat_percentage": 0.27,
        "vat_rate_net_amount": 25000,
        "vat_rate_vat_amount": 6750,
        "vat_rate_vat_amount_local": 6750,
        "vat_rate_gross_amount": 31750
      }
    ]
  },
  "settings": {
    "mediated_service": false,
    "without_financial_fulfillment": false,
    "online_payment": "",
    "should_send_email": false,
    "round": "none",
    "no_send_onlineszamla_by_user": false,
    "order_number": "",
    "place_id": null,
    "instant_payment": true,
    "selected_type": null,
    "dont_send_to_nav_reason": null,
    "instant_payment_request": null
  },
  "related_documents": [],
  "online_szamla_status": "no_online_szamla_settings",
  "discount": null
}
 */
