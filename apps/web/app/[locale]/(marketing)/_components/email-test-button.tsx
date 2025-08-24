'use client';

import { Button } from '@kit/ui/button';
import { useState } from 'react';
import { sendEmailAction } from '~/lib/email/server/server-actions';

export function EmailTestButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);
      setStatus('Envoi en cours...');

      await sendEmailAction({
        id: 'test-email',
        from:'toto@from.dev',
        to:'tata@to.dev',
        data: {
          productName: 'makerkit',
          userName:'Pascal'
        }
      });

      setStatus('Email envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      setStatus('Échec de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleSendEmail}
        disabled={isLoading}
      >
        {isLoading ? 'Envoi en cours...' : 'Envoyer un email de test'}
      </Button>

      {status && (
        <p className={`text-sm ${
          status.includes('succès')
            ? 'text-green-500'
            : status.includes('Échec')
              ? 'text-red-500'
              : 'text-blue-500'
        }`}>
          {status}
        </p>
      )}
    </div>
  );
}