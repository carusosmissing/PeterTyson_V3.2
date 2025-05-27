import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Layout, Images, Icons } from '../../constants';

const { width, height } = Dimensions.get('window');

export const TermsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    if (isAccepted) {
      console.log('Terms accepted');
      // Navigate to onboarding flow
      (navigation as any).navigate('Onboarding', { screen: 'MusicOrSports' });
    }
  };

  return (
    <ImageBackground 
      source={Images.welcomeBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    <View style={styles.container}>
        {/* Header with back button and title */}
      <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={Icons.back}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
      </View>
      
        {/* Terms content in scrollable container */}
        <View style={styles.termsContainer}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.termsTitle}>TruEXP Platform Terms of Service</Text>
            
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.sectionSubtitle}>Overview</Text>
            <Text style={styles.text}>
              Welcome to TruEXP, a platform created and operated by TruEXP Inc. ("TruEXP," "we," "us," or "our"). By using the TruEXP platform, you acknowledge and agree that TruEXP Inc. is providing the platform on an "as-is" basis and assumes no liability for user-generated content, third-party interactions, or technical failures. By accepting these terms and using the TruEXP platform, you agree to follow and abide by these Terms of Service ("Terms"). Please review these Terms attentively.
            </Text>
            
            <Text style={styles.sectionTitle}>2. Acceptance of Terms</Text>
            <Text style={styles.text}>
              Upon accessing or using the TruEXP platform, you consent to adhere to these Terms, our Privacy Policy, and any other policies mentioned here. If you do not consent to these Terms, you are not permitted to utilize the TruEXP platform.
            </Text>
            
            <Text style={styles.sectionTitle}>3. Description of Services</Text>
            <Text style={styles.text}>
              TruEXP offers a platform that merges a Web2 frontend with a Web3 backend to enrich fan engagement and loyalty through ticket stubs and rewards. Users can engage with their ticket stubs, take part in challenges, and acquire rewards. The platform also encompasses wallet management for assets.
            </Text>
            
            <Text style={styles.sectionTitle}>4. Account Registration</Text>
            <Text style={styles.text}>
              To access features of the TruEXP platform, registration for an account is necessary. You must provide up-to-date and complete information when registering and keep it updated. It is your responsibility to maintain the security of your account credentials and oversee all activities conducted under your account.
            </Text>
            
            <Text style={styles.sectionTitle}>5. Managing Custodial Wallets</Text>
            <Text style={styles.sectionSubtitle}>Overview</Text>
            <Text style={styles.text}>
              TruEXP offers services for managing wallets, enabling users to store, handle, and transact assets. By utilizing our wallet services, you agree to the terms outlined below:
            </Text>
            
            <Text style={styles.sectionSubtitle}>Custodial Services</Text>
            <Text style={styles.text}>
              1. Creating Wallets: We oversee digital wallets on your behalf.{'\n'}
              2. Asset Storage: We securely store assets using security protocols like encryption and cold storage solutions.{'\n'}
              3. Transaction Management: We facilitate transactions involving your assets as per your instructions.
            </Text>
            
            <Text style={styles.sectionSubtitle}>Security Measures</Text>
            <Text style={styles.text}>
              1. End-to-End Encryption: Ensures your data and transactions are secure during transmission and at rest.{'\n'}
              2. Two-Factor Authentication (2FA): Provides an additional layer of security for account access.{'\n'}
              3. Secure Key Management: Employs an encrypted vault to safeguard private keys.{'\n'}
              4. Routine Penetration Testing: Regularly checks for vulnerabilities to strengthen security protocols.
            </Text>
            
            <Text style={styles.sectionSubtitle}>User Responsibilities</Text>
            <Text style={styles.text}>
              1. Ensuring Accuracy: It is important to provide thorough information for creating and managing your wallet.{'\n'}
              2. Following Regulations: By using our wallet services, you agree to abide by all laws and regulations.{'\n'}
              3. Securing Your Account: You are tasked with safeguarding your account credentials and the devices you use to access your account.
            </Text>
            
            <Text style={styles.sectionTitle}>6. User Behavior</Text>
            <Text style={styles.sectionSubtitle}>Activities Not Allowed</Text>
            <Text style={styles.text}>
              You agree not to partake in the following prohibited actions:{'\n'}
              1. Unauthorized Access: Trying to access another user's account or information.{'\n'}
              2. Fraudulent Activities: Involvement in deceptive behaviors.{'\n'}
              3. Interference: Disrupting the functioning of the TruEXP platform.{'\n'}
              4. Illegal Actions: Engaging in any unlawful activities.
            </Text>
            
            <Text style={styles.sectionSubtitle}>Adherence</Text>
            <Text style={styles.text}>
              By using the TruEXP platform, you commit to complying with all laws and regulations.
            </Text>
            
            <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
            <Text style={styles.sectionSubtitle}>Intellectual Property Ownership</Text>
            <Text style={styles.text}>
              While TruEXP or its licensors own all content, trademarks, and other intellectual property on the TruEXP platform, users maintain ownership of the intellectual property rights for any assets they purchase through the platform. This includes ticket stubs, badges, and any other digital collectibles acquired via TruEXP.
            </Text>
            
            <Text style={styles.sectionSubtitle}>License</Text>
            <Text style={styles.text}>
              As long as you comply with these Terms, you are granted a non-exclusive, non-transferable license to access and utilize the TruEXP platform for your personal use. This license does not transfer ownership of any content, trademarks, or other intellectual property owned by TruEXP or its licensors.
            </Text>
            
            <Text style={styles.sectionTitle}>8. Disclaimers and Limitation of Liability</Text>
            <Text style={styles.sectionSubtitle}>Disclaimers</Text>
            <Text style={styles.text}>
              The TruEXP platform is provided "as is" and "as available." We do not guarantee any warranties, whether express or implied, including merchantability, suitability for a purpose, and non-infringement.
            </Text>
            
            <Text style={styles.sectionSubtitle}>Limitation of Liability</Text>
            <Text style={styles.text}>
              To the extent allowed by law, TruEXP will not be accountable for any incidental, special, or consequential damages, including any loss of profits, revenues, or goodwill—whether incurred directly or indirectly—or any loss of data, use, or other intangible losses resulting from:{'\n'}
              1. Your usage or inability to use the TruEXP platform.{'\n'}
              2. Unauthorized access or usage of our services.{'\n'}
              3. Interruption in transmission to or from the TruEXP platform.{'\n'}
              4. Bugs, viruses, trojan horses, or similar harmful elements that may be transmitted through our services by third parties.
            </Text>
            
            <Text style={styles.sectionTitle}>9. Indemnification</Text>
            <Text style={styles.text}>
              You agree to defend, protect, and support TruEXP and its affiliates, officers, directors, employees, and agents against any claims, liabilities, damages, losses, and expenses that may arise from your use of the TruEXP platform or any violation of these Terms.
            </Text>
            
            <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
            <Text style={styles.text}>
              We reserve the right to update these Terms as needed. Any modifications will be communicated by posting the Terms on the TruEXP platform. It is recommended that you check these Terms regularly for updates. Your ongoing use of the TruEXP platform following any changes indicates your acceptance of the revised Terms.
            </Text>
            
            <Text style={styles.sectionTitle}>11. Termination</Text>
            <Text style={styles.text}>
              We hold the authority to end or suspend your account and access to the TruEXP platform at our discretion, without notice or liability, if you violate these Terms. Upon termination, your privilege to use the TruEXP platform will cease immediately.
            </Text>
            
            <Text style={styles.sectionTitle}>12. Governing Law</Text>
            <Text style={styles.text}>
              These Terms are governed by and interpreted in accordance with the laws of [Your State], without consideration for its conflict of law principles.
            </Text>
            
            <Text style={styles.sectionTitle}>13. Dispute Resolution</Text>
            <Text style={styles.text}>
              In case of any disagreements related to these Terms or the TruEXP platform, they will be settled through binding arbitration following the rules of the American Arbitration Association. The arbitration proceedings will occur in Los Angeles, California, unless both parties agree to an alternative venue.
            </Text>
            
            <Text style={styles.sectionTitle}>14. Data Privacy and California Consumer Privacy Act (CCPA) Compliance</Text>
            <Text style={styles.sectionSubtitle}>Rights Under the CCPA</Text>
            <Text style={styles.text}>
              1. Right to Know: You have the right to request details about the personal information we collect, use, disclose, and sell.{'\n'}
              2. Right to Delete: You can request that we delete your personal information, subject to certain exceptions.{'\n'}
              3. Right to Opt-Out: You may opt-out of the sale of your personal information, if applicable.{'\n'}
              4. Right to Non-Discrimination: We will not discriminate against you for exercising your CCPA rights.
            </Text>
            
            <Text style={styles.sectionSubtitle}>Information We Collect</Text>
            <Text style={styles.text}>
              We may collect the following types of personal information:{'\n'}
              1. Identifiers, such as your name, email address, phone number, and account information.{'\n'}
              2. Internet or network activity, including interactions with the TruEXP platform, IP address, and browser type.{'\n'}
              3. Commercial information, including purchases and rewards earned.{'\n'}
              4. Geolocation data, if applicable to platform functionality.
            </Text>
            
            <Text style={styles.sectionSubtitle}>How We Use Your Information</Text>
            <Text style={styles.text}>
              We use your information to:{'\n'}
              1. Provide, maintain, and improve the TruEXP platform.{'\n'}
              2. Facilitate transactions and reward programs.{'\n'}
              3. Communicate with you about updates, promotions, and new features.
            </Text>
            
            <Text style={styles.sectionSubtitle}>Request Process</Text>
            <Text style={styles.text}>
              To exercise your rights under the CCPA, please contact us via email at team@truexp.com or by mail at 12100 Wilshire Blvd Suite #800, Los Angeles, CA 90025. We will verify your request by matching information provided with the data we maintain. Please note that some requests may require additional verification steps to ensure your identity.
            </Text>
            
            <Text style={styles.sectionTitle}>15. Miscellaneous</Text>
            <Text style={styles.sectionSubtitle}>Complete Agreement</Text>
        <Text style={styles.text}>
              These Terms serve as the entire agreement between you and TruEXP concerning the utilization of the TruEXP platform, superseding and replacing any prior agreements, understandings, or representations whether written or oral.
        </Text>
        
            <Text style={styles.sectionSubtitle}>Severability</Text>
        <Text style={styles.text}>
              If a provision in these Terms is determined to be invalid or unenforceable, the remaining provisions will still hold valid and effective.
        </Text>
        
            <Text style={styles.sectionSubtitle}>Waiver</Text>
        <Text style={styles.text}>
              The failure of TruEXP to enforce any right or provision in these Terms does not waive that right or provision.
        </Text>
        
            <Text style={styles.sectionSubtitle}>Contact Information</Text>
        <Text style={styles.text}>
              For any inquiries regarding these Terms, please reach out to us at:{'\n'}
              - Email: team@truexp.com{'\n'}
              - Address: 12100 Wilshire Blvd Suite #800, Los Angeles, CA 90025{'\n\n'}
              By utilizing the TruEXP platform, you acknowledge that you have read, comprehended, and consented to abide by these Terms of Service.
        </Text>
      </ScrollView>
        </View>
      
        {/* Footer with checkbox and accept button */}
      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setIsAccepted(!isAccepted)}
        >
            <View style={[styles.checkbox, isAccepted && styles.checkboxChecked]}>
              {isAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>I have read and agree to the Terms of Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[styles.acceptButton, !isAccepted && styles.acceptButtonDisabled]}
            onPress={handleAccept}
            disabled={!isAccepted}
        >
            <Text style={[styles.acceptButtonText, !isAccepted && styles.acceptButtonTextDisabled]}>
              Accept & Continue
            </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 44, // Offset for back button
  },
  termsContainer: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#60A5FA',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#60A5FA',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  acceptButton: {
    backgroundColor: '#60A5FA',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acceptButtonDisabled: {
    backgroundColor: 'rgba(96, 165, 250, 0.5)',
  },
  acceptButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  acceptButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
}); 