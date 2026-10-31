import test from 'node:test';
import assert from 'node:assert/strict';
import {rentalReceiptHtml,rentalReceiptText} from '../src/rental-receipt.js';
import {receiptHtml} from '../src/receipt.js';

const rental={id:'12345678-1234-1234-1234-123456789abc',equipment_name:'Badminton racket',staff:'Cashier A',started_at:'2026-10-31T08:00:00Z',returned_at:null,hours:'2',rate_cents:10000,total_cents:20000,customer_email:'client@example.com'};
test('rental receipt includes staff, booked charge, and reference',()=>{
 const html=rentalReceiptHtml(rental,{store_name:'CourtFlow Test'});
 const plain=rentalReceiptText(rental,{store_name:'CourtFlow Test',footer:'Thank you'});
 assert.match(html,/Badminton racket/);assert.match(html,/Cashier A/);
 assert.match(html,/₱200\.00/);assert.match(html,/RENTAL START RECEIPT/);
 assert.match(plain,/client@example.com/);assert.match(plain,/12345678-1234/);
});
test('rental return receipt shows returned timestamp',()=>{
 const html=rentalReceiptHtml({...rental,returned_at:'2026-10-31T10:00:00Z'});
 assert.match(html,/RENTAL RETURN RECEIPT/);assert.doesNotMatch(html,/Not yet returned/);
});
test('rental receipt escapes customer-controlled HTML',()=>{
 const html=rentalReceiptHtml({...rental,equipment_name:'<script>alert(1)</script>',staff:'<img src=x onerror=alert(1)>'});
 assert.doesNotMatch(html,/<script>/);assert.doesNotMatch(html,/<img src=x onerror=/);
 assert.match(html,/&lt;script&gt;/);
});
test('sales receipt still renders',()=>{
 const html=receiptHtml({id:rental.id,created_at:rental.started_at,cashier:'Cashier A',total_cents:10000,cash_received_cents:20000,items:[{product_name:'Ball',quantity:1,unit_price_cents:10000}]});
 assert.match(html,/Ball/);assert.match(html,/PAYMENT RECEIPT/);
});
