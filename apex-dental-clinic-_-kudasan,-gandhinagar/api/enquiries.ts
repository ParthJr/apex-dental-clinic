import type { IncomingMessage, ServerResponse } from 'http';

// Vercel Serverless Function handler for /api/enquiries
export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method not allowed. Use POST.' }));
    return;
  }

  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    const data = JSON.parse(body || '{}');
    const { fullName, mobileNumber, serviceInterest, preferredDate, consent } = data;

    if (!fullName || String(fullName).trim().length < 2) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Invalid name provided.' }));
      return;
    }

    const cleanedPhone = String(mobileNumber || '').replace(/[\s\-()]/g, '');
    const indianPhonePattern = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!indianPhonePattern.test(cleanedPhone)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Invalid Indian mobile number.' }));
      return;
    }

    if (!serviceInterest) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Clinical service selection is required.' }));
      return;
    }

    if (!preferredDate) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Preferred date is required.' }));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(preferredDate);
    if (isNaN(requestedDate.getTime()) || requestedDate < today) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Date cannot be in the past.' }));
      return;
    }

    if (!consent) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Consent is required to proceed.' }));
      return;
    }

    const referenceId = `APX-${Date.now().toString().slice(-6)}`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: true,
        referenceId,
        message: 'Your appointment request has been received. The clinic team will contact you to confirm availability.',
      })
    );
  } catch {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Malformed JSON payload.' }));
  }
}
