import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    ArrowPathRoundedSquareIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline'
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon
} from '@heroicons/react/20/solid'

import MagicBell, {
    flatTheme,
    FloatingNotificationInbox
} from '@magicbell/magicbell-react'

import { SignInButton, useUser, UserButton } from '@clerk/clerk-react'

// import {
//   NovuProvider,
//   PopoverNotificationCenter,
//   NotificationBell
// } from '@novu/notification-center'

const products = [
    {
        name: 'TestMaker',
        description: 'Effortlessly create robust test cases',
        href: '/testmaker',
        icon: ChartPieIcon,
        status: ['New', 'Beta']
    },
    {
        name: 'ConstraintCheck',
        description: 'Ensure code compliance with ease',
        href: '/comingSoon',
        icon: CheckBadgeIcon,
        status: ['Upcoming']
    },
    {
        name: 'TestRunner',
        description: 'Execute test cases efficiently',
        href: '/comingSoon',
        icon: FingerPrintIcon,
        status: ['Upcoming']
    },
    {
        name: 'PathScope Analyzer',
        description: 'Gain insights into code paths',
        href: '/comingSoon',
        icon: ArrowPathRoundedSquareIcon,
        status: ['Upcoming']
    },
    {
        name: 'SolutionCraft',
        description: 'Optimize your code solutions effortlessly',
        href: '/comingSoon',
        icon: ArrowPathIcon,
        status: ['Upcoming']
    },
    {
        name: 'CodeCoverage Analyzer',
        description: 'Ensure comprehensive code coverage',
        href: '/comingSoon',
        icon: SquaresPlusIcon,
        status: ['Upcoming']
    },
    {
        name: 'EvalEase',
        description: 'Streamline evaluation processes effortlessly',
        href: '/comingSoon',
        icon: CursorArrowRaysIcon,
        status: ['Upcoming']
    }
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon }
]
const getStatusColor = statuses => {
    let combinedColorClass = ''

    if (Array.isArray(statuses)) {
        statuses.forEach(status => {
            switch (status) {
                case 'Upcoming':
                    combinedColorClass += ' bg-orange-400'
                    break
                case 'Beta':
                    combinedColorClass += ' bg-red-400'
                    break
                case 'New':
                    combinedColorClass += ' bg-teal-400'
                    break
                default:
                    combinedColorClass += ' bg-gray-400'
            }
        })
    } else {
        switch (statuses) {
            case 'Upcoming':
                combinedColorClass += ' bg-orange-400'
                break
            case 'Beta':
                combinedColorClass += ' bg-red-400'
                break
            case 'New':
                combinedColorClass += ' bg-teal-400'
                break
            default:
                combinedColorClass += ' bg-gray-400'
        }
    }

    return combinedColorClass
}

const stores = [
    { id: 'default', defaultQueryParams: { read: false } },
    { id: 'unread', defaultQueryParams: { read: true } }
]

// can list all stores, but doesn't need to
const tabs = [
    { storeId: 'default', label: 'Latest' },
    { storeId: 'unread', label: 'Archive' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user } = useUser()

    return (
        <>
            <header className='absolute inset-x-0 top-0 z-50'>
                <nav
                    className='flex items-center justify-between p-6 lg:px-8 sticky top-0 z-50lex items-center justify-between p-6 lg:px-8'
                    aria-label='Global'
                >
                    <div className='flex lg:flex-1'>
                        <a href='/' className='-m-1.5 p-1.5'>
                            <span className='sr-only'>CodeLens</span>
                            <img
                                className='h-8 w-auto'
                                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                alt=''
                            />
                        </a>
                    </div>
                    <div className='flex lg:hidden'>
                        <button
                            type='button'
                            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className='sr-only'>Open main menu</span>
                            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <Popover.Group className='hidden lg:flex lg:gap-x-12'>
                        <Popover className='relative'>
                            <Popover.Button className='flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none'>
                                Product
                                <ChevronDownIcon
                                    className='h-5 w-5 flex-none text-gray-400'
                                    aria-hidden='true'
                                />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-200'
                                enterFrom='opacity-0 translate-y-1'
                                enterTo='opacity-100 translate-y-0'
                                leave='transition ease-in duration-150'
                                leaveFrom='opacity-100 translate-y-0'
                                leaveTo='opacity-0 translate-y-1'
                            >
                                <Popover.Panel className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
                                    <div className='p-4'>
                                        {products.map(item => (
                                            <div
                                                key={item.name}
                                                className='group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50'
                                            >
                                                <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                                                    <item.icon
                                                        className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                                                        aria-hidden='true'
                                                    />
                                                </div>
                                                <div className='flex-auto relative'>
                                                    <a
                                                        href={item.href}
                                                        className='block font-semibold text-gray-900 text-left relative'
                                                    >
                                                        <span className='flex items-center'>
                                                            {item.name}
                                                            {item.status && (
                                                                <span className='ml-2 flex'>
                                                                    {(Array.isArray(
                                                                        item.status
                                                                    )
                                                                        ? item.status
                                                                        : [
                                                                              item.status
                                                                          ]
                                                                    ).map(
                                                                        (
                                                                            status,
                                                                            index
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className={`mr-2 ${getStatusColor(
                                                                                    status
                                                                                )} text-white px-2 py-1 rounded-full text-xs`}
                                                                            >
                                                                                {
                                                                                    status
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <p className='mt-1 text-gray-600 text-left'>
                                                            {item.description}
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
                                        {callsToAction.map(item => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100'
                                            >
                                                <item.icon
                                                    className='h-5 w-5 flex-none text-gray-400'
                                                    aria-hidden='true'
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        <a
                            href='/#features'
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            Features
                        </a>
                        <a
                            href='/#pricing'
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            Marketplace
                        </a>
                        <a
                            href='/#pricing'
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            Pricing
                        </a>
                    </Popover.Group>
                    <div className='hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4'>
                        {/* Show MagicBell only when user is signed in */}
                        {user && (
                            <MagicBell
                                apiKey={import.meta.env.VITE_MAGICBELL_API_KEY}
                                apiSecret={
                                    import.meta.env.VITE_MAGICBELL_API_SECRET
                                }
                                userEmail={
                                    user.primaryEmailAddress?.emailAddress
                                }
                                stores={stores}
                                userKey='...'
                            >
                                {props => (
                                    <FloatingNotificationInbox
                                        theme={flatTheme}
                                        height={450}
                                        {...props}
                                        tabs={tabs}
                                    />
                                )}
                            </MagicBell>
                        )}
                        {/* {user && (
              <NovuProvider
                subscriberId={user?.primaryEmailAddress?.emailAddress}
                firstName={user?.firstName || ''}
                lastName={user?.lastName || ''}
                applicationIdentifier={'n_Y2geiu17b4'}
              >
                <PopoverNotificationCenter colorScheme={'light'}>
                  {({ unseenCount }) => (
                    <NotificationBell unseenCount={unseenCount} />
                  )}
                </PopoverNotificationCenter>
              </NovuProvider>
            )} */}
                        {/* Show user details and logout button when user is signed in */}
                        {!user ? (
                            <SignInButton>
                                <a
                                    href='#'
                                    onClick={e => {
                                        // eslint-disable-next-line no-extra-semi
                                        ;<SignInButton />
                                        e.preventDefault()
                                    }}
                                    className='text-sm font-semibold leading-6 text-gray-900'
                                >
                                    <button
                                        type='button'
                                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    >
                                        Log In
                                    </button>
                                </a>
                            </SignInButton>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                {/* Display user details */}
                                <span className='text-sm font-semibold leading-6 text-gray-900'>
                                    Welcome, {user.fullName}
                                </span>
                                {/* Logout button */}
                                <div className='text-sm font-semibold leading-6 text-gray-900'>
                                    <UserButton afterSignOutUrl='/' />
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
                <Dialog
                    as='div'
                    className='lg:hidden'
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className='fixed inset-0 z-10' />
                    <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                        <div className='flex items-center justify-between'>
                            <a href='#' className='-m-1.5 p-1.5'>
                                <span className='sr-only'>Your Company</span>
                                <img
                                    className='h-8 w-auto'
                                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                    alt=''
                                />
                            </a>
                            <button
                                type='button'
                                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className='sr-only'>Close menu</span>
                                <XMarkIcon
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                />
                            </button>
                        </div>
                        <div className='mt-6 flow-root'>
                            <div className='-my-6 divide-y divide-gray-500/10'>
                                <div className='space-y-2 py-6'>
                                    <Disclosure as='div' className='-mx-3'>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                                    Products
                                                    <ChevronDownIcon
                                                        className={classNames(
                                                            open
                                                                ? 'rotate-180'
                                                                : '',
                                                            'h-5 w-5 flex-none'
                                                        )}
                                                        aria-hidden='true'
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className='mt-2 space-y-2'>
                                                    {[
                                                        ...products,
                                                        ...callsToAction
                                                    ].map(item => (
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as='a'
                                                            href={item.href}
                                                            className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                                        >
                                                            {item.name}
                                                        </Disclosure.Button>
                                                    ))}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <a
                                        href='#features'
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Features
                                    </a>
                                    <a
                                        href='#'
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                    >
                                        Marketplace
                                    </a>
                                    <a
                                        href='#pricing'
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Pricing
                                    </a>
                                </div>
                                <div className='py-6 flex items-center justify-between'>
                                    {/* Show user details and logout button when user is signed in */}
                                    {!user ? (
                                        <SignInButton>
                                            <a
                                                href='#'
                                                onClick={e => {
                                                    // eslint-disable-next-line no-extra-semi
                                                    ;<SignInButton />
                                                    e.preventDefault()
                                                }}
                                                className='text-sm font-semibold leading-6 text-gray-900'
                                            >
                                                Log in{' '}
                                                <span aria-hidden='true'>
                                                    &rarr;
                                                </span>
                                            </a>
                                        </SignInButton>
                                    ) : (
                                        <div className='flex items-center space-x-4'>
                                            {/* Display user details */}
                                            <span className='text-sm font-semibold leading-6 text-gray-900'>
                                                Welcome, {user.fullName}
                                            </span>
                                            {/* Logout button */}
                                            <div className='text-sm font-semibold leading-6 text-gray-900'>
                                                <UserButton afterSignOutUrl='/' />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </>
    )
}
