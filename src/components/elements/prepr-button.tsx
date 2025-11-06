import { useMemo } from 'react'
import Button from '@/components/elements/button'
import { Link } from '@/i18n/routing'
import LinkButton from '@/components/elements/link-button'
import { ButtonFragment } from '@/gql/graphql'

interface PreprButtonProps {
  button: ButtonFragment
  className?: string
}

/**
 * Builds the URL from button link or external_url
 */
function buildButtonUrl(button: ButtonFragment): string {
  if (button.external_url) {
    return button.external_url
  }

  if (button.link) {
    switch (button.link.__typename) {
      case 'Category':
        return `/products/${button.link._slug || ''}`
      case 'Page':
        return `/${button.link._slug || ''}`
      case 'Post':
        return `/blog/${button.link._slug || ''}`
      default:
        return ''
    }
  }

  return ''
}

export default function PreprButton({ button, className }: PreprButtonProps) {
  const url = useMemo(() => buildButtonUrl(button), [button.external_url, button.link])
  const text = button.text || ''

  if (!button.button_type) {
    return null
  }

  switch (button.button_type) {
    case 'PRIMARY':
      return (
        <Link href={url}>
          <Button buttonStyle="primary" className={className}>
            {text}
          </Button>
        </Link>
      )

    case 'SECONDARY':
      return (
        <Link href={url}>
          <Button buttonStyle="secondary" className={className}>
            {text}
          </Button>
        </Link>
      )

    case 'LINK':
      return (
        <LinkButton href={url} className={className}>
          {text}
        </LinkButton>
      )
  }
}
