/**
 * Website Knowledge Base
 * Contains all website content for RAG-based chatbot
 */

export const websiteKnowledgeBase = {
  company: {
    name: "3D7 Technologies",
    description: "3D7 Technologies specializes in various engineering activities that help businesses achieve their goals. We solve business problems using Artificial Intelligence systems.",
    approach: "Design, Develop and Deliver",
  },
  services: {
    main: [
      {
        title: "AI Systems Development",
        description: "Crafting cutting-edge AI systems tailored to specific business needs and requirements.",
      },
      {
        title: "Project Consultancy",
        description: "Providing expert project consultancy services to help businesses achieve their goals.",
      },
      {
        title: "Web Builder Platforms",
        description: "Empowering Africa's micro, small, and medium enterprises with web builder platforms and a marketplace for them to showcase their products and services.",
      },
    ],
  },
  products: [
    {
      name: "DocuHelp",
      description: "DocuHelp helps you write business documents. It assists in writing business documents efficiently.",
      link: "https://docuhelp.ai/",
      category: "Document Writing Tool",
    },
    {
      name: "Requstory",
      description: "Requstory helps you write your 'user story' fast by simply describing the features of your project/product. A user story writing tool.",
      link: "https://requstory.com/",
      category: "User Story Writing Tool",
    },
    {
      name: "JRS (Job Recommender System)",
      description: "JRS is a recommender system that helps individuals search for jobs. It's a job recommender system.",
      link: "https://jrs.3d7tech.com/",
      category: "Job Search Tool",
    },
    {
      name: "Text2AI",
      description: "Text2AI allows you to send prompts via SMS and get smart answers instantly. Provides smart answers to questions via SMS.",
      link: "/text2AI",
      category: "SMS AI Assistant",
    },
    {
      name: "ngr.ltd",
      description: "Empowering Nigerian micro, small, and medium enterprises (MSMEs) with a user-friendly and affordable web builder platform. A marketplace for MSMEs to showcase their products and services.",
      link: "https://ngr.ltd",
      category: "Web Builder Platform",
    },
    {
      name: "Play 1.0",
      description: "Play brings together all your work tools — email, chat, docs, tasks, and more — powered by AI, right on your desktop. It's private, fast, and fully local — no cloud, no subscriptions, no limits. Your workspace. Your AI. Your rules.",
      link: "/play",
      category: "AI-Powered Workspace",
      features: ["Chat", "Documents", "Tasks", "Calendar"],
    },
  ],
  team: [
    {
      name: "Richard Awe",
      role: "Founder & CEO",
      description: "Nigerian/British IT professional with comprehensive background in successful project deliveries within Nigerian and UK financial services sector. Extensive experience in enterprise migrations and industry-wide regulatory projects. Started 3D7 Technologies to help solve business problems using Artificial Intelligence systems.",
    },
    {
      name: "Victor Ukam",
      role: "CTO",
      description: "Dedicated to creative problem-solving for over a decade. Engaged in diverse activities from crafting web applications to overseeing the servers that support them.",
    },
    {
      name: "Adaeze Ekwochi",
      role: "Product Manager",
      description: "Product manager with experience in delivering innovative solutions and strategies to meet customer needs. Passionate about driving product excellence through collaboration and user-centric design.",
    },
    {
      name: "Samuel Ibitoye",
      role: "Full Stack Developer",
      description: "Solutions Expert and Full Stack Software Developer with strong passion for change, self-motivated, and value focused.",
    },
    {
      name: "Ediomo Titus",
      role: "Frontend Developer",
      description: "Software Developer passionate about crafting user-centric applications, strives to innovate and deliver scalable solutions that drive positive user experiences.",
    },
    {
      name: "Tochukwu Ubah",
      role: "Software/Visual Designer",
      description: "Creates visually appealing and solution driven designs for 8 billion people on earth.",
    },
    {
      name: "Hilda Okafor",
      role: "UX Designer",
      description: "Thrives at the confluence of product, research, and design to create human-centered products and design solutions that profoundly enhance users activities.",
    },
    {
      name: "Oluwatosin Bashua",
      role: "Sales Specialist",
      description: "Sales specialist with a knack for product marketing and a love for continuous learning. Tech-savvy by nature, embraces emerging technologies to optimize sales and marketing strategies.",
    },
    {
      name: "Femi Akindele",
      role: "Digital Marketing Expert",
      description: "Digital Marketing Expert with 5+ years' experience in executing data-driven campaigns and driving brand growth. Skilled in the digital marketing stack and customer support management, dedicated to enhancing customer engagement and revenue through innovative strategies.",
    },
  ],
  process: {
    design: {
      title: "Design",
      description: "Crafting intuitive and scalable AI solutions tailored to your specific requirements",
    },
    develop: {
      title: "Develop",
      description: "Building robust AI systems utilising cutting-edge technologies and best practices",
    },
    deliver: {
      title: "Deliver",
      description: "Implementing and deploying solutions that drive real business value",
    },
  },
  contact: {
    calendly: "https://calendly.com/consult3d7tech/project-consultancy",
    message: "Get started with a consultation to discuss your project needs.",
  },
  partners: [
    "European Central Bank",
    "Swinton",
    "Lloyds",
    "Autoweb",
    "HSBC",
    "Barclays",
  ],
};

/**
 * Search function to find relevant content based on query
 */
export function searchKnowledgeBase(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Search company info
  if (
    lowerQuery.includes("company") ||
    lowerQuery.includes("about") ||
    lowerQuery.includes("who are you") ||
    lowerQuery.includes("what is 3d7")
  ) {
    results.push({
      type: "company",
      content: `Company: ${websiteKnowledgeBase.company.name}. ${websiteKnowledgeBase.company.description} We follow a ${websiteKnowledgeBase.company.approach} approach.`,
      relevance: 0.9,
    });
  }

  // Search products
  websiteKnowledgeBase.products.forEach((product) => {
    if (
      lowerQuery.includes(product.name.toLowerCase()) ||
      lowerQuery.includes(product.category.toLowerCase()) ||
      product.description.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        type: "product",
        content: `Product: ${product.name} - ${product.description}. Category: ${product.category}. Link: ${product.link}`,
        relevance: 0.8,
      });
    }
  });

  // Search services
  if (
    lowerQuery.includes("service") ||
    lowerQuery.includes("what do you do") ||
    lowerQuery.includes("offer")
  ) {
    websiteKnowledgeBase.services.main.forEach((service) => {
      results.push({
        type: "service",
        content: `Service: ${service.title} - ${service.description}`,
        relevance: 0.85,
      });
    });
  }

  // Search team
  websiteKnowledgeBase.team.forEach((member) => {
    if (
      lowerQuery.includes(member.name.toLowerCase()) ||
      lowerQuery.includes(member.role.toLowerCase())
    ) {
      results.push({
        type: "team",
        content: `Team Member: ${member.name}, ${member.role} - ${member.description}`,
        relevance: 0.7,
      });
    }
  });

  // Search process
  if (
    lowerQuery.includes("process") ||
    lowerQuery.includes("design") ||
    lowerQuery.includes("develop") ||
    lowerQuery.includes("deliver")
  ) {
    Object.values(websiteKnowledgeBase.process).forEach((step) => {
      if (lowerQuery.includes(step.title.toLowerCase())) {
        results.push({
          type: "process",
          content: `${step.title}: ${step.description}`,
          relevance: 0.75,
        });
      }
    });
  }

  // Search contact
  if (
    lowerQuery.includes("contact") ||
    lowerQuery.includes("consultation") ||
    lowerQuery.includes("get started") ||
    lowerQuery.includes("schedule")
  ) {
    results.push({
      type: "contact",
      content: `Contact: ${websiteKnowledgeBase.contact.message} Schedule a consultation at ${websiteKnowledgeBase.contact.calendly}`,
      relevance: 0.9,
    });
  }

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  // Return top 5 most relevant results
  return results.slice(0, 5).map((r) => r.content).join("\n\n");
}

