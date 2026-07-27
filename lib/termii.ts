/**
 * Termii SMS Integration Service
 * Base URL: https://v4.api.termii.com
 */

interface SendSMSParams {
  to: string; // Recipient phone number (e.g. 2348012345678 or 08012345678)
  message: string;
}

export function formatPhoneNumber(phone: string): string {
  // Clean non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Format local 080... to 23480...
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.substring(1);
  }
  
  return cleaned;
}

export async function sendSMS({ to, message }: SendSMSParams) {
  const apiKey = process.env.TERMII_API_KEY;
  const baseUrl = process.env.TERMII_BASE_URL || 'https://v4.api.termii.com';
  const senderId = process.env.TERMII_SENDER_ID || 'N-ALERT';

  if (!apiKey) {
    console.warn('[Termii] API key is missing. Skipping SMS dispatch.');
    return { success: false, error: 'Termii API Key missing' };
  }

  const recipient = formatPhoneNumber(to);

  try {
    const response = await fetch(`${baseUrl}/api/sms/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        to: recipient,
        from: senderId,
        sms: message,
        type: 'plain',
        channel: 'generic',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Termii] SMS Dispatch Failed:', data);
      return { success: false, error: data.message || 'SMS delivery failed' };
    }

    console.log('[Termii] SMS Sent Successfully:', data);
    return { success: true, messageId: data.message_id };
  } catch (error: any) {
    console.error('[Termii] Network Error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
}

export async function sendContributionReceiptSMS({ to, memberName, amount, receiptRef }: { to: string; memberName: string; amount: number; receiptRef: string }) {
  const message = `Hello ${memberName}, your contribution of NGN ${amount.toLocaleString()} was received successfully. Receipt Ref: ${receiptRef}. Thank you for saving with your Cooperative on Osusu!`;
  return sendSMS({ to, message });
}

export async function sendLoanStatusSMS({ to, memberName, amount, status }: { to: string; memberName: string; amount: number; status: string }) {
  const message = `Hello ${memberName}, your loan application of NGN ${amount.toLocaleString()} has been updated to status: ${status}. Log into your Osusu passbook to view details.`;
  return sendSMS({ to, message });
}
