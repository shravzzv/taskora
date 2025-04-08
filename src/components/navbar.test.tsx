import Navbar from './navbar'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('next/link', () => {
  const MockLink = ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => <a href={href}>{children}</a>
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('taskora')).toBeInTheDocument()
    expect(screen.getByText('taskora').closest('a')).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('renders the Features link', () => {
    render(<Navbar />)
    const featuresLink = screen.getByText('Features')
    expect(featuresLink).toBeInTheDocument()
    expect(featuresLink.closest('a')).toHaveAttribute('href', '#features')
  })

  it('renders the Dashboard link', () => {
    render(<Navbar />)
    const dashboardLink = screen.getByText('Dashboard')
    expect(dashboardLink).toBeInTheDocument()
    expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard')
  })
})
