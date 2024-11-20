import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Sergio Scardigno",
  initials: "SS",
  location: "La Plata, Buenos Aires, AR",
  locationLink:
    "https://www.google.com/maps/place/La+Plata,+Provincia+de+Buenos+Aires/",
  about: "DevOps Engineer | Backend Developer | PHP Developer",
  summary:
    "Como profesional en constante evolución en el ámbito de la tecnología, mi enfoque actual está en profundizar mis conocimientos y habilidades en el desarrollo full stack, tanto en backend como en frontend. Con experiencia en tecnologías como Laravel, Node.js, React.js y Angular, he diseñado y desarrollado aplicaciones escalables, seguras y eficientes. Mis habilidades abarcan desde la creación de APIs y la optimización de bases de datos, hasta el desarrollo de interfaces de usuario dinámicas y optimizadas para una excelente experiencia. He trabajado en todos los aspectos del ciclo de vida de desarrollo de software, incluyendo pruebas, depuración, despliegue y mantenimiento continuo. Certificaciones en AWS y React.js respaldan mi compromiso con la mejora continua y la adopción de nuevas tecnologías. Apasionado por la automatización y la eficiencia en los procesos de desarrollo, mi objetivo es seguir creando soluciones que aporten valor a los proyectos y optimicen su rendimiento.",
  avatarUrl: "/img/sergio.png",
  personalWebsiteUrl: "#",
  contact: {
    email: "sergioscardigno82@gmail.com",
    tel: "+542214099792",
    asesoramiento: "/asesoramiento",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/scardigno1982",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sergio-scardigno/",
        icon: LinkedInIcon,
      },
    ],
  },
  education: [
    {
      school: "Platzi",
      link: "https://platzi.com/p/sergios_plat/curso/8036-c-sharp-poo/diploma/detalle/",
      degree: "Programación Orientada a Objetos con C#",
      aptitudes: "C#",
      start: "2024",
      end: "2024",
    },
    {
      school: "Platzi",
      link: "https://platzi.com/p/sergios_plat/curso/3086-csharp/diploma/detalle/",
      degree: "Curso Básico de Programación con C#",
      aptitudes: "C#",
      start: "2024",
      end: "2024",
    },
    {
      school: "EducacionIT",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      degree: "Devops Engineer",
      aptitudes:
        "Terraform · DevOps · Ansible · Jenkins · Kubernetes · AWS CloudFormation · Docker · GitOps · Amazon Web Services (AWS)",
      start: "2023",
      end: "2024",
    },
    {
      school: "Universidad Nacional de Tres de Febrero",
      degree: "Argentina Programa Backend",
      link: "#",
      aptitudes: "Mongo, Node JS, Express",
      start: "2023",
      end: "2023",
    },
    {
      school: "EducacionIT",
      degree: "Introducción a Bases de Datos y SQL",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes: "SQL · Microsoft SQL Server · MySQL · PostgreSQL",
      start: "2023",
      end: "2023",
    },
    {
      school: "EducacionIT",
      degree: "PHP Arquitectura Avanzada",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes: "Programación orientada a objetos (POO) · PHP",
      start: "2022",
      end: "2022",
    },
    {
      school: "EducacionIT",
      degree: "React js",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes: "JavaScript · React.js",
      start: "2021",
      end: "2021",
    },
    {
      school: "EducacionIT",
      degree: " Javascript Desarrollador Avanzado",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes: "JavaScript",
      start: "2021",
      end: "2021",
    },
    {
      school: "EducacionIT",
      degree: "Python Programming",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes:
        "Python · Programación orientada a objetos (POO) · Programación",
      start: "2021",
      end: "2021",
    },
    {
      school: "EducacionIT",
      degree: "Desarrollo Web en Python & Django",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821/certificado/47296",
      aptitudes: "Python · Web frameworks y Django · Tipos de vistas",
      start: "2021",
      end: "2021",
    },
    {
      school: "EducacionIT",
      degree: "Desarrollo Web en Python & Django",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821/certificado/51616",
      aptitudes: "Python · Jupyter Notebook · Data Scientist",
      start: "2021",
      end: "2021",
    },
    {
      school: "EducacionIT",
      degree: "Administrador Hosting Avanzado Linux",
      link: "https://www.educacionit.com/perfil/sergio-scardigno-266821",
      aptitudes:
        "Administración de DNS · Linux · Servicios de hosting · Servidores web",
      start: "2021",
      end: "2021",
    },
  ],
  work: [
    // {
    //   company:
    //     "Dirección General de Cultura y Educación de la Provincia de Buenos Aires · Jornada completa",
    //   link: "https://mapaescolar.abc.gob.ar",
    //   badges: [],
    //   title: "Programador Full-Stack Developer | Sysadmin | DevOps",
    //   logo: ParabolLogo,
    //   start: "2023",
    //   end: "now",
    //   description:
    //     "Administración de bases de datos SQL y Postgresql, Desarrollo de proyectos Angular y web. Implementacion de Jelkins para la automatizacion de proyectos.",
    // },
    {
      company: "Usina Estrategias digitales · Part-time",
      link: "#",
      badges: [],
      title: "Programador Full-Stack Developer",
      logo: ParabolLogo,
      start: "2023",
      end: "now",
      description:
        "Como desarrollador full stack abarca todas las etapas del desarrollo, desde el diseño inicial hasta el despliegue y mantenimiento continuo.",
    },
    {
      company:
        "Honorable Cámara de Senadores de la Provincia de Buenos Aires · Jornada completa",
      link: "#",
      badges: [],
      title: "Programador Php Full-Stack Developer",
      logo: ParabolLogo,
      start: "2018",
      end: "2020",
      description: "Desarrollo Sección de noticias o Blog",
    },
  ],

  awards: [
    {
      award: "Programación Orientada a Objetos con C#",
      link: "https://platzi.com/p/sergios_plat/curso/8036-c-sharp-poo/diploma/detalle/",
      year: "2024",
      url: "/img/objetosc.png",
    },
    {
      award: "Curso Básico de Programación con C#",
      link: "https://platzi.com/p/sergios_plat/curso/3086-csharp/diploma/detalle/",
      year: "2024",
      url: "/img/basicoc.png",
    },
    {
      award: "Implement Load Balancing on Compute Engine Skill Badge",
      link: "https://www.credly.com/badges/bb904419-d430-44d2-9803-ea939e519de6/",
      year: "2024",
      url: "/img/implement-load-balancing-on-compute-engine-skill-ba.png",
    },
    {
      award: "AWS Knowledge: Amazon EKS",
      link: "https://www.credly.com/badges/e2ee97e6-1fb5-4d82-a4cc-5bf46656387d/",
      year: "2023",
      url: "/img/aws.png",
    },
    {
      award:
        "Certificado de asistencia al curso: Desarrollo rápido de aplicaciones con Low Code, organizado por DonWeb (Marzo-Abril 2023)",
      link: "https://guias.donweb.com/certificados-curso-lowcode-2023/sergioscardigno82_gmail_com",
      year: "2023",
      url: "/img/donweb.png",
    },
    {
      award: "Curso Online de Vagrant",
      link: "https://openwebinars.net/cert/nw5Yz?r=6e5906d6e&t=1626095498",
      year: "2023",
      url: "/img/vagrant.png",
    },
    {
      award: "Reacj.js Avanzado",
      link: "https://api.educacionit.com/pdf/certificados/Sergio-Scardigno-266821/50452",
      year: "2023",
      url: "/img/react.png",
    },
    {
      award: "PHP Avanzado",
      link: "https://api.educacionit.com/pdf/certificados/Sergio-Scardigno-266821/54910",
      year: "2023",
      url: "/img/php.png",
    },
  ],

  published: [
    {
      title:
        "Simplificando la Extracción de Números en Documentos PDF con Python",
      pub: "Este proyecto surge de la necesidad de extraer números específicos de documentos PDF, especialmente cuando estos números están incrustados como imágenes.",
      year: "2024",
      link: "https://www.linkedin.com/pulse/simplificando-la-extracci%25C3%25B3n-de-n%25C3%25BAmeros-en-documentos-pdf-scardigno-gftyf/",
    },
    {
      title:
        "Copilot utilizando LM Studio y el plugin Continue en Visual Studio Code",
      pub: "En este artículo, te guiaré a través de los pasos para configurar tu propio copilot utilizando LM Studio y el plugin Continue en Visual Studio Code.",
      year: "2024",
      link: "https://bit.ly/425mZOT",
    },
    {
      title: "Integración de Prometheus y Grafana en Proyecto Laravel",
      pub: "Quiero compartirles mi experiencia reciente en la implementación exitosa de Prometheus y Grafana en un proyecto Laravel, llevando el monitoreo a otro nivel. Configuré Prometheus y Grafana utilizando Docker Compose en una máquina virtual, mientras mi proyecto Laravel se ejecutaba sin problemas en Xampp.",
      year: "2024",
      link: "https://bit.ly/3HmZR4X",
    },
    {
      title:
        "Bootcamp de DevOps: Un Viaje Conjunto hacia la Integración Eficiente",
      pub: "En el vertiginoso mundo de la tecnología, la integración eficiente de herramientas de desarrollo y operaciones (DevOps) se ha vuelto esencial para agilizar procesos y garantizar despliegues exitosos. Nuestra travesía, realizada en conjunto durante el Bootcamp de DevOps de Educación IT, nos llevó a explorar herramientas clave como Vagrant, Docker, Kubernetes, Helm y ArgoCD.",
      year: "2023",
      link: "https://bit.ly/3UbB3EJ",
    },
    {
      title:
        "Automatizando el flujo de trabajo en proyectos Angular con Jenkins y CI/CD",
      pub: "En mi trabajo actual, he implementado un robusto flujo de Integración Continua/Despliegue Continuo (CI/CD) para optimizar el desarrollo de proyectos Angular utilizando Jenkins. A continuación, comparto los pasos clave de la configuración de Jenkins y el flujo de CI/C",
      year: "2023",
      link: "https://bit.ly/3U5wlZ5",
    },
    // {
    //   title: "Conectando Ubuntu 22.04 a SQL Server 2000: Superando Desafíos",
    //   pub: "¿Te has enfrentado a la tarea aparentemente imposible de conectar Ubuntu 22.04 a una base de datos SQL Server 2000? No estás solo. La descontinuación de los conectores ODBC para esta antigua versión de SQL Server y la obsolescencia de los repositorios de Ubuntu 16.04 pueden hacer que esta tarea parezca un callejón sin salida. Pero no te preocupes, ¡aquí está la solución!",
    //   year: "2023",
    //   link: "https://www.linkedin.com/pulse/conectando-ubuntu-2204-sql-server-2000-superando-sergio-scardigno%3FtrackingId=eKnJ9deG2EZPGrAcajPAVg%253D%253D/?trackingId=eKnJ9deG2EZPGrAcajPAVg%3D%3D",
    // },
    // {
    //   title:
    //     "Reemplazando la Librería Deprecada ultraware/roles en PHP 8.2.8 y Laravel 10: Creando una Solución Personalizada",
    //   pub: "La librería ultraware/roles ha sido una herramienta invaluable para manejar roles y permisos en nuestras aplicaciones durante mucho tiempo. Sin embargo, como todas las cosas en el mundo de la tecnología, ha llegado el momento en que ha sido marcada como deprecada. Esto nos obliga a buscar nuevas soluciones, y en este artículo, te mostraré cómo reemplacé esta librería con mi propio código en Laravel 10.",
    //   year: "2023",
    //   link: "https://www.linkedin.com/pulse/reemplazando-la-librer%25C3%25ADa-deprecada-ultrawareroles-en-php-scardigno-zeeaf/",
    // },
  ],

  // end insert

  skills: [
    "PHP",
    "Laravel",
    "MySQL",
    "HTML",
    "CSS",
    "Javascript",
    "Git",
    "Linux",
    "AWS",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Ansible",
    "Terraform",
    "Bash",
    "Python",
    "Node.js",
    "React",
    "Vue",
    "Angular",
    "Wordpress",
    "Devops",
    "GCP",
    "Azure",
  ],
  projects: [
    {
      title: "Vagrant, Docker, Kubernetes, Helm y ArgoCD",
      techStack: ["Vagrant", "Docker", "Kubernetes", "Helm", "ArgoCD"],
      description:
        "El proyecto implica la creación de una máquina virtual con Vagrant, dockerización de una aplicación, automatización del proceso con CI/CD, despliegue en Kubernetes con actualización sin interrupciones, y la implementación de Helm y ArgoCD para la gestión de aplicaciones con y sin Helm en distintos namespaces.",
      logo: ConsultlyLogo,
      link: {
        label: "https://gitlab.com/sergioscardigno82/tp-10/",
        href: "https://gitlab.com/sergioscardigno82/tp-10/",
      },
    },
    {
      title: "Jenkins y Vagrant",
      techStack: ["Jenkins", "Vagrant", "CI/CD"],
      description:
        "Este instructivo detalla cómo configurar Jenkins, establecer un administrador, crear un pipeline y gestionar los permisos de scripts en el entorno Jenkins. También se incluye una guía para configurar Vagrant y crear una máquina virtual con Ubuntu 22.04.",
      logo: ConsultlyLogo,
      link: {
        label: "https://github.com/Scardigno1982/CI-CD",
        href: "https://github.com/Scardigno1982/TP-7-CI-CD",
      },
    },
    {
      title:
        "Integración de una imagen Docker previamente creada al entorno de Kubernetes",
      techStack: ["Kubernetes", "Minikube", "Docker"],
      description:
        "En este trabajo, se llevó a cabo la integración de una imagen Docker previamente creada al entorno de Kubernetes",
      logo: ConsultlyLogo,
      link: {
        label: "https://github.com/Scardigno1982/Kubernetes",
        href: "https://github.com/Scardigno1982/TP-8-Kubernetes",
      },
    },
    // {
    //   title: "Mapa Escolar",
    //   techStack: [
    //     "Angular",
    //     "Tailwind",
    //     "HTML",
    //     "Typescript",
    //     "Content",
    //     "Full Stack Developer",
    //   ],
    //   description:
    //     "Replicando en Angular el proyecto ABC de la Dirección General de Cultura y Educación de la Provincia de Buenos Aires",
    //   logo: ConsultlyLogo,
    //   link: {
    //     label: "mapaescolar.abc.gob.ar",
    //     href: "https://mapaescolar.abc.gob.ar",
    //   },
    // },
    // {
    //   title: "Diera",
    //   techStack: ["Laravel", "Tailwind", "PHP", "Postgresql", "Content"],
    //   description:
    //     "Actualizacion de librerias deprecadas, migracion de base de datos, actualizacion de version de laravel y version de PHP",
    //   logo: ConsultlyLogo,
    //   link: {
    //     label: "mapaescolar.abc.gob.ar/diera",
    //     href: "https://mapaescolar.abc.gob.ar/diera",
    //   },
    // },
    {
      title: "Curso de Backend con Node.js y Express - Argentina Programa 4.0",
      techStack: ["Node.js", "Express", "Javascript", "MongoDB"],
      description:
        "Este repositorio alberga proyectos del curso de Backend con Node.js y Express en el marco de Argentina Programa 4.0. Aquí, aprenderás y explorarás las capacidades de desarrollo backend, arquitectura API RESTful y la interacción con bases de datos tanto relacionales como no relacionales. Los proyectos presentados son el resultado del aprendizaje y la dedicación durante el curso impartido en la Universidad de 3 de Febrero en 2023.",
      logo: ConsultlyLogo,
      link: {
        label: "https://github.com/Scardigno1982/backend-2023",
        href: "https://github.com/Scardigno1982/curso-backend-2023",
      },
    },
  ],
} as const;
