'use client'

import Container from '@/components/container'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import PreprButton from '@/components/elements/prepr-button'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ButtonFragment } from '@/gql/graphql'

export default function NavbarClient(props: { items: ButtonFragment[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    if (!props.items) {
        return null
    }

    function handleMobileMenuClose(): void {
        setMobileMenuOpen(false)
    }

    return (
        <header className='bg-primary-100 py-4'>
            <nav aria-label='Global'>
                <Container className='flex items-center justify-between'>
                    <Link
                        href='/'
                        className='hover:cursor-pointer'
                    >
                        <Image
                            src='/logo.svg'
                            width={150}
                            height={40}
                            alt='Demo Logo'
                            className='max-h-10'
                        />
                    </Link>

                    <div className='flex lg:hidden'>
                        <button
                            type='button'
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label='Open mobile menu'
                            aria-expanded={mobileMenuOpen}
                        >
                            <div className='flex h-8 w-8 items-center justify-center text-lg'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 16 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M0 1.625C0 1.02734 0.492188 0.5 1.125 0.5H14.625C15.2227 0.5 15.75 1.02734 15.75 1.625C15.75 2.25781 15.2227 2.75 14.625 2.75H1.125C0.492188 2.75 0 2.25781 0 1.625ZM0 7.25C0 6.65234 0.492188 6.125 1.125 6.125H14.625C15.2227 6.125 15.75 6.65234 15.75 7.25C15.75 7.88281 15.2227 8.375 14.625 8.375H1.125C0.492188 8.375 0 7.88281 0 7.25ZM15.75 12.875C15.75 13.5078 15.2227 14 14.625 14H1.125C0.492188 14 0 13.5078 0 12.875C0 12.2773 0.492188 11.75 1.125 11.75H14.625C15.2227 11.75 15.75 12.2773 15.75 12.875Z'
                                        fill='black'
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div className='hidden items-center gap-8 lg:flex'>
                        {/*  Navitems  */}
                        <div className='flex items-center gap-12'>
                            {props.items.map((item, idx) => (
                                <PreprButton
                                    button={item}
                                    key={item.text || `nav-${idx}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <Dialog
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                        className='z-30 lg:hidden'
                        as='div'
                    >
                        <div className='fixed inset-0 z-10' />
                        <DialogPanel className='bg-primary-100 fixed inset-y-0 right-0 z-10 w-full overflow-y-auto sm:max-w-sm'>
                            <div className='p-spacing flex items-center justify-between py-4 sm:justify-end'>
                                <Link
                                    href='/'
                                    className='-m-1.5 p-1.5 hover:cursor-pointer sm:hidden'
                                >
                                    <span className='sr-only'>Acme demo</span>
                                    <Image
                                        src='/logo.svg'
                                        alt='Acme Logo'
                                        width={150}
                                        height={40}
                                    />
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => setMobileMenuOpen(false)}
                                    className='-m-2.5 rounded-md p-2.5 text-gray-700'
                                    aria-label='Close menu'
                                >
                                    <span className='sr-only'>Close menu</span>
                                    <div className='flex h-8 w-8 items-center justify-center text-lg'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 13 13'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M12.0234 2.55859L8.33203 6.25L12.0234 9.97656C12.4805 10.3984 12.4805 11.1367 12.0234 11.5586C11.6016 12.0156 10.8633 12.0156 10.4414 11.5586L6.75 7.86719L3.02344 11.5586C2.60156 12.0156 1.86328 12.0156 1.44141 11.5586C0.984375 11.1367 0.984375 10.3984 1.44141 9.97656L5.13281 6.25L1.44141 2.55859C0.984375 2.13672 0.984375 1.39844 1.44141 0.976562C1.86328 0.519531 2.60156 0.519531 3.02344 0.976562L6.75 4.66797L10.4414 0.976562C10.8633 0.519531 11.6016 0.519531 12.0234 0.976562C12.4805 1.39844 12.4805 2.13672 12.0234 2.55859Z'
                                                fill='black'
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-12 px-4 py-10'>
                                {props.items.map((item, idx) => (
                                    <div
                                        onClick={handleMobileMenuClose}
                                        key={item.text || `nav-mobile-${idx}`}
                                    >
                                        <PreprButton
                                            button={item}
                                            className='text-mb-2xl font-medium'
                                        />
                                    </div>
                                ))}
                            </div>
                        </DialogPanel>
                    </Dialog>
                </Container>
            </nav>
        </header>
    )
}
