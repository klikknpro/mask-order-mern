"Számlák" szamlatomb id: 146322

Bank account JSON from billingo:

{
"id": 121689,
"name": "main-account",
"account_number": "1177301611111018",
"account_number_iban": "HU42117730161111101800000000",
"swift": "OTPVHUHB",
"currency": "HUF",
"need_qr": false
}

Product JSON from billingo:

{
"id": 10111622,
"name": "FFP2/KN95",
"comment": "",
"currency": "HUF",
"vat": "27%",
"net_unit_price": 100,
"gross_unit_price": 127,
"unit": "db",
"general_ledger_number": "",
"general_ledger_taxcode": "",
"entitlement": null,
"ean": "",
"sku": "",
"is_manage": true,
"purchase_price": 80
}

Invoice generator JSON (POST request):

{
"partner_id": 1746900936,
"block_id": 146322,
"bank_account_id": 121689,
"type": "invoice",
"fulfillment_date": "2022-04-21",
"due_date": "2022-05-07",
"payment_method": "aruhitel",
"language": "hu",
"currency": "HUF",
"electronic": false,
"paid": false,
"items": [
{
"product_id": 10111622,
"quantity": 200
}
],
"comment": "sold 200 masks WOHOOO"
}

CONNECTION_STRING=mongodb://localhost:27017/mask-order

API_Key=e1938dbc-bfec-11ec-ab27-0254eb6072a0
