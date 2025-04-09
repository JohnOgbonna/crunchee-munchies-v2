// lib/cognitoAuth.ts
import {
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
  } from '@aws-sdk/client-cognito-identity-provider';
  import crypto from 'crypto';
  
  const client = new CognitoIdentityProviderClient({ region: 'us-west-2' });
  
  function generateSecretHash(username: string): string {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!;
    return crypto
      .createHmac('sha256', clientSecret)
      .update(username + clientId)
      .digest('base64');
  }
  
  export const signIn = async (email: string, password: string): Promise<string> => {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
    const secretHash = generateSecretHash(email);
  
    const input = {
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH, // ✅ Use enum value
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      };
  
    const command = new InitiateAuthCommand(input);
    
    try {
      const response = await client.send(command);
      console.log(response)
      const idToken = response.AuthenticationResult?.IdToken;
      if (!idToken) throw new Error('Token not received');
      return idToken;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Authentication failed');
    }
  };
  export const signOut = () => {
    localStorage.removeItem('cognitoToken');
  };