import Link from "next/link";
import Image from "next/image";
import React from "react";

const Efficiency = () => {
    const scrollToContact = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
        <div className="container">
            <div className="row container-inner-padding " style={{padding:"80px"}}>
                <div className="col-lg-6 col-md-12">
                    <div
                        className="section-title text-left"
                        data-sal="slide-up"
                        data-sal-duration="400"
                        data-sal-delay="150"

                    >
                        <h4 className="subtitle">
                            <span className="theme-gradient-new">EFFICIENCY</span>
                        </h4>
                        <h2 className="title theme-heading-text heading-minor-mob">
                            Enhance Customer Interactions with Interactive Dialogue Programming
                        </h2>
                        <p className="theme-mini-text" >Our chatbot utilizes interactive dialogue programming to handle complex conversations, providing efficient and effective customer interactions.</p> 
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="chatbotFeatures">
                        <div className="featuresContainer">
                            <div className="featureCard">

                            <div>
                            <Image src="/images/logo/miniLogo.svg" width='56' height='56' alt='YES'/> 
                            </div>

                            <h3 className="featureTitle text-mob">Complexity Handled</h3>
                            <p className="theme-mini-text ">From simple queries to intricate discussions, our chatbot handles complex conversations effortlessly.</p>
                          </div>
                          <div className="featureCard">

                            <div >
                            <Image src="/images/logo/miniLogo.svg" width='56' height='56' alt='YES'/> 
                            </div>
                            
                            <h3 className="featureTitle text-mob">Improved Service</h3>
                            <p className="theme-mini-text">Experience enhanced customer service with our chatbot's interactive dialogue programming capabilities.</p>
                          </div>
                        </div>
                        <div className="ctaContainer">
                        <Link href="/utilize">
                            <button className="button outline" style={{ border: '1px solid #334155' }}>
                              <span className="buttonText">Learn More</span>
                              <img loading="lazy" src="/images/icons/circle.svg" alt="" className="buttonIcon" />
                            </button>
                          </Link>
                            <button className="button primary" onClick={scrollToContact}>
                              <span className="buttonText">Contact Us</span>
                              <img loading="lazy" src="/images/icons/circle.svg" alt="" className="buttonIcon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
                
            <div className="row hide-mob" > 
            <div className="eff-left"> 
                 <Image className="hide-mob"  src="/images/cta-img/eff-left.svg" width='303' height='72' alt='YES'/>
                 </div>
                <div className="eff-right"> 
                 <Image className="hide-mob"  src="/images/cta-img/eff-right.svg" width='291' height='101' alt='YES'/>
                 </div> 
                <div className="chat-container" >
  <div className="chat-message user">
    <div className="message-content">Find the bug on my code</div>
    
  </div>

  <div className="chat-message bot">
    <div className="bot-avatar">
    <img
      src="images/team/bot.svg"
      alt="Bot avatar"
      className="bot-avatar-img"
    />
    </div>
    <div className="message-wrapper">
      <div className="message-bubble">Find bug on your code</div>
      <div className="code-block">
        <div className="code-header">
          <span className="language-label">html</span>
          <button className="copy-button">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/73bc98ac6d40a4ad22efd4cb87a49d49f0329e856a2a3c7df87478c0574a708a"
              alt="Copy"
              className="copy-icon"
            />
            <span>Copy</span>
          </button>
        </div>
        <pre className="code-content">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;title&gt;Batman Fan Club&lt;/title&gt;
&lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
</pre>

      </div>
    </div>
  </div>

  <div className="chat-message user">
    <div className="message-content">Do my math homework</div>
    <img
      src="images/team/user.png"
      alt="User avatar"
      className="user-avatar-img"
    />
  </div>

  <div className="chat-message bot">
    <div className="bot-avatar">
    <img
      src="images/team/bot.svg"
      alt="Bot avatar"
      className="bot-avatar-img"
    />
    </div>
    <div className="message-content">
      I can help you with your math homework, but it is important to note that I
      am still under development and may not be able to solve all math problems
      perfectly.
    </div>
  </div>

  <div className="chat-message user">
    <div className="message-content">Sing me happy birthday</div>
    <img
      src="images/team/user.png"
      alt="User avatar"
      className="user-avatar-img"
    />
  </div>

  <div className="chat-message bot">
    <div className="bot-avatar">
    <img
      src="images/team/bot.svg"
      alt="Bot avatar"
      className="bot-avatar-img"
    />
    </div>
    <div className="message-content">Happy birthday to you!</div>
  </div>

  <div className="chat-message user">
    <div className="message-content">
      Illustrate cute pink cat with rainbow behind it
    </div>
    <img
      src="images/team/user.png"
      alt="User avatar"
      className="user-avatar-img"
    />
  </div>

  <div className="chat-message bot">
    <div className="bot-avatar">
    <img
      src="images/team/bot.svg"
      alt="Bot avatar"
      className="bot-avatar-img"
    />
    </div>
    <div className="message-wrapper">
      <div className="message-content">This is the result</div>
      <div className="image-gallery">
        <div className="gallery-header">
          <span className="gallery-title">Image of a pink cat</span>
        </div>
        <div className="gallery-grid ">
          <div className="gallery-row">
            <img
              src="/images/generator-img/cat1.jpg"
              alt="Generated image 1"
              className="gallery-image"
            />
            <img
              src="/images/generator-img/cat2.jpg"
              alt="Generated image 2"
              className="gallery-image"
            />
          </div>
          <div className="gallery-row">
            <img
              src="/images/generator-img/cat3.jpg"
              alt="Generated image 3"
              className="gallery-image"
            />
            <img
              src="/images/generator-img/cat4.jpg"
              alt="Generated image 4"
              className="gallery-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
        </div>
    );
};

export default Efficiency;
