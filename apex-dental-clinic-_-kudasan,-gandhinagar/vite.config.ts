import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Built-in API Mock & Server-side Validation Handler for Appointment Enquiries
function appointmentApiPlugin(): Plugin {
  return {
    name: 'appointment-api-handler',
    configureServer(server) {
      server.middlewares.use('/api/enquiries', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { fullName, mobileNumber, serviceInterest, preferredDate, consent } = data;

              // Server-side validation
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

              // Generate reference identifier
              const referenceId = `APX-${Date.now().toString().slice(-6)}`;
              console.log(`[Clinic Reception] Valid appointment enquiry received:`, {
                referenceId,
                patient: fullName,
                phone: cleanedPhone,
                service: serviceInterest,
                date: preferredDate,
                window: data.preferredWindow,
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  referenceId,
                  message: 'Your appointment request has been received. The clinic team will contact you to confirm availability.',
                })
              );
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Malformed JSON payload.' }));
            }
          });
        } else if (req.method === 'GET') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'online', service: 'Apex Dental Clinic Appointment Gateway' }));
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), appointmentApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
