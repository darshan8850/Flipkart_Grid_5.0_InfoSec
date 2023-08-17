import React from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FiPieChart, FiLink } from 'react-icons/fi';
import { BsBoxSeam} from 'react-icons/bs';


export const links = [
  // {
  //   title: 'Dashboard',
  //   links: [
  //     {
  //       name: 'Dashboard',
  //       icon: <RiStockLine />,
  //     },
  //   ],
  // },

  {
    title: 'System Generated Logs',
    links: [
      {
        name: 'System_Analysis',
        icon: <AiOutlineBarChart />,
      },
      // {
      //   name: 'System_History',
      //   icon: <FiPieChart />,
      // },
      {
        name: 'Blocked_users',
        icon: <BsBoxSeam />,
      }
    ],
  },
  {
    title: 'Customer Interaction Log',
    links: [
      {
        name: 'Customer_Analysis',
        icon: <AiOutlineBarChart />,
      },
      // {
      //   name: 'Customer_History',
      //   icon: <FiPieChart />,
      // }
    ],
  },
  {
    title: 'Documentation',
    links: [
      {
        name: 'Documentation',
        icon: <FiLink />,
      },
      // {
      //   name: 'Customer_History',
      //   icon: <FiPieChart />,
      // }
    ],
  },
];

export const customer_rules = {
  "Privacy rules": [
      " Customer will not share any sensitive personal information like passwords, OTPs, or financial information Mask/remove any sensitive data like passwords, card numbers during conversations Only access customer accounts and devices with explicit consent and for purposes of troubleshooting issues. Do not record calls or conversations without informing the customer. Follow organizational policies. "
  ],
  "Customer Service Standards rules": [
      " Respond to customer queries within SLA Time Provide clear resolutions/next steps to issues raised Use empathetic language like \"I understand the frustration\" Use respectful and professional language at all times  Avoid sarcasm, condescending remarks or culturally insensitive phrases"
  ],
  "Customer Contract Rules": [
      " Abide by all terms and conditions agreed with customers Do not misuse customer data beyond scope of the contract "
  ],
  "GDPR Rules": [
      " Explicit consent must be taken before processing any customer personal data Right to be forgotten requests must be handled within 72 hours "
  ],
  "Do Not Call Registry Rules": [
      " Do not call or email any customer numbers listed on DNC registry Manual verification of consent for marketing communications "
  ],
  "PCI DSS": [
      " Payment card industry and data security standard )  Rules (Payment transactions): Store cardholder data only as long as necessary to fulfill the transaction. Once a transaction is complete, purge all sensitive transaction data like full PAN, expiration dates, etc. Protect stored cardholder data. Encrypt stored data and use strong unique passwords/keys. Limit access to only authorized personnel. Log and monitor access to network resources and cardholder data. Maintain logs of all user access and system changes for at least one year. Protect wireless networks. Make sure all wireless networks are secure and encrypted if transmitting card data. Use and update anti-virus software. Deploy anti-virus programs on all systems to protect from malware that can steal cardholder data. Restrict access to cardholder data by business need to know. Only allow access to transactions and logs by those who need it for their job functions. Regularly test security systems and processes. Conduct internal and external vulnerability testing at least quarterly and after any changes Maintain an information security policy. Document security policies, procedures, standards and keep them up to date. Provide security awareness training to all staff. Back up logs and transaction data regularly. Maintain archived transaction records and logs in a secure off-site location for at least one year."
  ],
  "Debit and Credit cards related rule": [
      " Storage of Card Information Flipkart does not store your complete credit/debit card information. Flipkart only retains the last 4 digits of your card number for identification purpose "
  ],
  "Cancellation Policy": [
      ": The customer can choose to cancel an order any time before it's dispatched. The order cannot be canceled once it\u00e2\u20ac\u2122s out for delivery. However, the customer may choose to reject it at the doorstep. The time window for cancellation varies based on different categories and the order cannot be canceled once the specified time has passed. In some cases, the customer may not be allowed to cancel the order for free, post the specified time and a cancellation fee will be charged. The details about the time window mentioned on the product page or order confirmation page will be considered final. In case of any cancellation from the seller due to unforeseen circumstances, a full refund will be initiated for prepaid orders. Flipkart reserves the right to accept the cancellation of any order. Flipkart also reserves the right to waive off or modify the time window or cancellation fee from time to time."
  ],
  "Phishing and Fraud Prevention": [
      " Do not click links or download attachments from unverified sources Report any suspected fraudulent activity immediately "
  ],
  "Return Policy": [
      " The policy is divided into 3 parts: categories and return windows, return processing, and general rules. Categories include lifestyle, books, medicine, etc. Return windows range from 2-10 days depending on category. Most allow refund, replacement, or exchange. Some only replacement. During return pickup, the product will be checked for conditions like correct product, complete accessories, unused, undamaged, undamaged packaging. Returns that don't meet these can be refused. For refunds, the money will be processed once the returned item is received by the seller. In some cases where replacement isn't possible, a refund will be given. Missing accessories may get a replacement or equivalent e-gift voucher. For furniture, service personnel will try to resolve issues by replacing faulty parts first, before full replacement. Flipkart can restrict the number of returns per order based on their product evaluation. Open box deliveries cannot be returned once accepted, except for manufacturing defects. Category specific rules still apply in those cases."
  ]
}