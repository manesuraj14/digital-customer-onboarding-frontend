import "../../components/ui/About.css";


export default function About() {
  const industries = [
    {
      title: "Banking",
      desc: "Secure digital KYC, identity verification, and instant account onboarding built to meet regulatory compliance and customer trust."
    },
    {
      title: "Healthcare",
      desc: "Seamless patient and staff onboarding with protected data handling, consent management, and faster access to healthcare services."
    },
    {
      title: "Real Estate",
      desc: "Paperless onboarding for buyers, sellers, and tenants with digital identity verification and document validation."
    },
    {
      title: "E-Commerce",
      desc: "Fast onboarding for customers, vendors, and suppliers with secure verification, fraud prevention, and smooth activation."
    }
  ];

  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>Digital Customer Onboarding</h1>
        <p>
          A secure, scalable, and paperless platform designed to simplify and
          accelerate customer onboarding across multiple industries.
        </p>
      </section>

      {/* AIM & CAPABILITIES */}
      <section className="about-overview">
        <div className="overview-card">
          <h2>Our Aim</h2>
          <p>
            Our aim is to modernize the onboarding process by eliminating manual
            paperwork, reducing errors, and ensuring regulatory compliance
            through secure digital workflows.
          </p>
        </div>

        <div className="overview-card">
          <h2>Platform Capabilities</h2>
          <p>
            The platform delivers domain-specific onboarding workflows, real-time
            data capture, intelligent validation, and a seamless user experience
            tailored to the unique needs of each industry.
          </p>
        </div>
      </section>

      {/* INDUSTRY SOLUTIONS */}
      <section className="about-industries">
        <h2>Industry Solutions</h2>
        <div className="industry-grid">
          {industries.map((item, index) => (
            <div key={index} className="industry-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM IMPLEMENTATION */}
      <section className="about-working">
        <h2>System Implementation Overview</h2>
        <p>
          This implementation demonstrates interactive onboarding workflows,
          structured data collection, validation logic, and secure submission
          mechanisms. It showcases how digital onboarding enhances operational
          efficiency, data accuracy, and overall user experience in real-world
          environments.
        </p>
      </section>

    </div>
  );
}
