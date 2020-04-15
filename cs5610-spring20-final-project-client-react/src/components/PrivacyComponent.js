import React from "react";
import NavContainer from "../containers/NavContainer";

const PrivacyComponent = ({history}) =>
    <div>
        <NavContainer
            enableSearch={true}
            history={history}
        />
    <div className="container mt-5 mb-5">

        <h1 className="text-left">Privacy Policy</h1>
        <br/>
        <h2>1. INFORMATION WE COLLECT</h2>
        <p>We collect the following types of information.</p>
        <h5>Information you provide us directly:</h5>
        <ul>
            <li>Your username, password, email address or phone number when you register for a MovieTime account, and
                the avatar
                picture you provide for your user profile.
            </li>
            <li>
                User content (e.g. ratings, comments, reviews, and photos) that you post to the Service.
            </li>
            <li>Shared preferences (e.g. liked reviews and favorite movies) that you save on the Service.</li>
        </ul>
        <h5>Collection and usage information:</h5>
        <ul>
            <li>When you use the Service, our servers would automatically record certain log file information, including
                your
                web requests, number of clicks, and how you interact with links on the Service, domain names, browsing
                activity,
                movies you searched, movie-related contents you viewed and duration, and other information that assists
                us in
                improving our Service and personalize your experience.
            </li>
        </ul>

        <h5>Cookies and similar technologies:</h5>
        <ul>
            <li>When you register or log in MovieTime, the Service will collect and store useful information in cookies.
                When
                you revisit the Service, we can use the information stored to identify you. Cookies from our service can
                only be
                read by our service. If your browser is set to reject cookies, you can still access most of the web
                pages on the
                Service.
            </li>
        </ul>

        <br/>
        <h2>2. HOW WE USE YOUR INFORMATION</h2>
        <h5>Account Information:</h5>
        <ul>
            <li>Identify you and provide you with access to your personalized data and functionalities only exposed to
                logged-in
                users (e.g. post comments, reviews).
            </li>
            <li>Remember information so you will not have to re-login the Service during your visit or the next time you
                visit
                the Service.
            </li>
            <li>Respond to your potential requests or inquiries, including technical support.</li>
        </ul>

        <h5>User-generated content:</h5>

        <ul>
            <li>The content you posted on our Service(e.g. Ratings, comments, reviews) will be used to generate your
                personalized homepage/profile and be displayed as movie-related content to other users.
            </li>
            <li>Your shared preference(e.g liked reviews and favorite movies) will be leveraged to generate your
                personalized
                pages and be displayed on your public profile for other users to access.
            </li>

            <li>Use inferences about your shared preferences and interests to provide you with customized product
                experience
                such as content (movie) recommendations.
            </li>
        </ul>

        <h5>Collection and usage information:</h5>
        <ul>
            <li>Provide personalized content and information to you and other users on the Service, such as personalized
                pages
                and other content recommendations.
            </li>
            <li>Provide, improve, monitor, and test the effectiveness of the Service.</li>
            <li>Monitor metrics such as the total number of visitors, traffic, browsing activities, and demographic
                patterns on
                the Service.
            </li>
            <li>Share with partnered third parties with your consent for non-advertising purposes.</li>
        </ul>

        <br/>

        <h2>3. SHARING OF YOUR INFORMATION</h2>
        <h5>Partnered third parties:</h5>

        <ul>
            <li>We use third-party analytics tools such as Google Analytics to help us measure our traffic, usage
                trends, and
                other related information for the Service. These tools collect information sent by your devices or our
                Service,
                such as the web pages you visit and other information for improving our service and marketing purposes.
            </li>
        </ul>
        <h5>Law enforcement or legal requests:</h5>
        <ul>
            <li>We may share your information with law enforcement or in response to legal requests from government and
                other
                authorities, to comply with legal process or protect against possible illegal acts.
            </li>
        </ul>

        <br/>

        <h2>4. HOW WE PROTECT YOUR INFORMATION</h2>

        <ul>
            <li>We have used secure safeguards to help protect the information you provide. For example, we provide
                https secure
                browsing to our website, and we adopt access control mechanisms to ensure that only authorized people
                can access
                user information.
            </li>
            <li>
                Despite all reasonable measures, no security method is infallible. We strongly recommend that you do not
                send
                personal information through email, instant message and other methods and use a complex password to help
                us keep
                your account safe.
            </li>
        </ul>

        <br/>

        <h2>5. YOUR CHOICES ABOUT YOUR INFORMATION</h2>

        <h5>Your account information and profile settings:</h5>
        <ul>
            <li>Update your account at any time by logging in and changing your profile settings.</li>
        </ul>
        <h5>How long we keep your personal information and user content:</h5>
        <ul>
            <li>
                Following termination or deactivation of your account, we will not retain your personal information and
                user
                content for longer than is necessary for legal requirements. When no longer required, we will destroy,
                erase all
                your personal information and user content from all our storage. You may request to delete your
                information on
                the Service. If the Service terminates for some reason, we will immediately stop collecting your
                information and
                destroy, erase all your information from all our storage.
            </li>
        </ul>

        <br/>

        <h2>6. SECURITY OF YOUR INFORMATION</h2>
        <ul>
            <li>
                We will use commercially reasonable efforts to safeguard the confidentiality of the information
                collected
                through our Service. We also take reasonable steps, e.g. request a password, to verify your identity
                before
                granting your access to your account.
            </li>
            <li>
                However, we cannot guarantee that communications between you and our servers will be free from
                unauthorized
                access, disclosure, alteration, or destruction by third parties or that we will not be subject to
                security
                breaches, because of the nature of the Internet and other factors outside of our control.
            </li>
        </ul>

        <br/>

        <h2>7. CHILDREN</h2>
        <ul>
            <li>MovieTime’s service and contents are not directed to children under the age of 16 and we do not
                knowingly
                collect any information from anyone under the age of 16. If we learn that we have inadvertently
                collected any
                personal information from anyone under the age of 16 without parental consent, we will immediately
                delete and
                erase that information from all our possible storage.
            </li>
        </ul>

        <br/>

        <h2>8. CONTACT US</h2>
        <ul>
            <li>
                If you have any question about this Privacy Policy or the Service, please contact us at
                <a href="mailto:cs5610webdevmovie@gmail.com"> cs5610webdevmovie@gmail.com</a>
            </li>
        </ul>
    </div>
    </div>

export default PrivacyComponent
