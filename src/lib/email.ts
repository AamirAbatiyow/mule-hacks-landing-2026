type EmailResponse = {
  ok: boolean;
  sent?: number;
  skipped?: boolean;
  recipients?: number;
  error?: string;
};

async function postEmail(path: string, body: unknown): Promise<EmailResponse | null> {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as EmailResponse;
  } catch (error) {
    console.warn(`Email request failed for ${path}:`, error);
    return null;
  }
}

export function sendConfirmationEmail(email: string, name?: string) {
  void postEmail("/api/send-confirmation", { email, name });
}

export async function sendAnnouncementEmail(
  title: string,
  message: string,
  recipients: string[]
) {
  return postEmail("/api/send-announcement", { title, message, recipients });
}
