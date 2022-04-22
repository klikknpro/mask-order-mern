const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  invoice_number: String,
  block_id: Number,
  payment_method: String,
  gross_total: Number,
  invoice_date: String,
  partner: {
    id: Number,
    name: String,
  },
  items: { id: Number, name: String, quantity: Number },
  comment: String,
});
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;

/*
{
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
					"name": "FFP2\/KN95",
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
		},
*/
