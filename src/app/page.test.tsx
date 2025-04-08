import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LandingPage from './page'

jest.mock('@/components/navbar', () => {
  const MockNavbar = () => <div data-testid='mock-navbar'>Mock Navbar</div>
  MockNavbar.displayName = 'MockNavbar'
  return MockNavbar
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt='' />
  ),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  ),
}))


describe('LandingPage', () => {
  it('renders the Navbar component', () => {
    render(<LandingPage />)
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<LandingPage />)
    expect(screen.getByText('Tasks, just tasks.')).toBeInTheDocument()
  })

  it('renders the description paragraph', () => {
    render(<LandingPage />)
    expect(
      screen.getByText(
        'Keep track of the daily tasks in life and get that satisfaction upon completion.'
      )
    ).toBeInTheDocument()
  })

  it('renders the "Get Started" link', () => {
    render(<LandingPage />)
    const getStartedLink = screen.getByText('Get Started')
    expect(getStartedLink).toBeInTheDocument()
    expect(getStartedLink).toHaveAttribute('href', '/dashboard')
  })

  it('renders the "Learn More" link', () => {
    render(<LandingPage />)
    const learnMoreLink = screen.getByText('Learn More')
    expect(learnMoreLink).toBeInTheDocument()
    expect(learnMoreLink).toHaveAttribute('href', '#features')
  })

  it('renders the features section heading', () => {
    render(<LandingPage />)
    expect(screen.getByText('Features')).toBeInTheDocument()
  })

  it('renders all feature list items', () => {
    render(<LandingPage />)
    const features = [
      'Organize tasks with an intuitive and user-friendly interface.',
      'Set deadlines and receive timely reminders for your tasks.',
      'Track progress with visual indicators and completion stats.',
      'Collaborate with others by sharing tasks and assigning roles.',
      'Access your tasks seamlessly across multiple devices.',
    ]

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('renders the image with correct attributes', () => {
    render(<LandingPage />)
    const image = screen.getByAltText('')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/windows.png')
    expect(image).toHaveAttribute('width', '400')
    expect(image).toHaveAttribute('height', '400')
  })
})
