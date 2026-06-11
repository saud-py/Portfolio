/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu Show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu Hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    window.scrollY >= 50 ? header.classList.add('blur-header')
                         : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    // Keep original services and template ids
    emailjs.sendForm('service_vwx0u8t', 'template_gfz2z5u', '#contact-form', 'OHT2_z6dHL56635Xt')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅'
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)
            contactForm.reset()
        }, () => {
            contactMessage.textContent = 'Message not received (Service Error) ❌'
        })
}

if (contactForm) {
    contactForm.addEventListener('submit', sendEmail)
}

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUpButton = document.getElementById('scroll-up')
    window.scrollY >= 350 ? scrollUpButton.classList.add('show-scroll')
                          : scrollUpButton.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (sectionClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionClass.classList.add('active-link')
            } else {
                sectionClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CONTRIBUTIONS INTERACTIVE TABS ===============*/
const tabs = document.querySelectorAll('.contributions__tab'),
      tabContents = document.querySelectorAll('.contributions__content')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target
        const targetContent = document.getElementById(targetId)

        // Remove active-tab from all tabs
        tabs.forEach(t => t.classList.remove('active-tab'))
        // Add active-tab to current tab
        tab.classList.add('active-tab')

        // Remove active-content from all contents
        tabContents.forEach(content => {
            content.classList.remove('active-content')
        })
        
        // Add active-content to clicked tab content
        if (targetContent) {
            targetContent.classList.add('active-content')
        }
    })
})

/*=============== TYPING ANIMATION ===============*/
const words = ["AWS Cloud Engineer", "DevSecOps Specialist", "FinOps Architect", "Cloud Automation Engineer"]
let wordIndex = 0
let charIndex = 0
let isDeleting = false
const typingTextSpan = document.getElementById("typing-text")

const typeEffect = () => {
    if (!typingTextSpan) return

    const currentWord = words[wordIndex]
    if (isDeleting) {
        typingTextSpan.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
    } else {
        typingTextSpan.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true
        setTimeout(typeEffect, 2000) // Keep word visible for 2 seconds
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(typeEffect, 400) // Pause before next word
    } else {
        setTimeout(typeEffect, isDeleting ? 40 : 80) // Typing speed is 80ms, erasing is 40ms
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingTextSpan) {
        setTimeout(typeEffect, 1000)
    }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500, 
    delay: 400,
})

sr.reveal(`.home__data, .home__social, .home__stats, .contact__container, .footer__container`)
sr.reveal(`.home__image`, {origin: 'bottom'})
sr.reveal(`.about__data, .skills__data`, {origin: 'left'})
sr.reveal(`.about__image, .skills__content`, {origin: 'right'})
sr.reveal(`.contributions__tabs`, {origin: 'top', delay: 200})
sr.reveal(`.contributions__content`, {origin: 'bottom', delay: 300})
sr.reveal(`.services__card, .projects__card`, {interval: 100})
