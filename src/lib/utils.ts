import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Removes HTML tags from a string
 * @param str - String with potential HTML tags
 * @returns String with HTML tags removed
 */
export function stripInput(str: string): string {
    return str.replace(/(<([^>]+)>)/gi, '')
}

/**
 * Converts a string to a URL-friendly slug
 * @param str - String to slugify
 * @returns URL-friendly slug
 */
export function slugify(str: string): string {
    str = stripInput(str)
    str = str.replace(/^\s+|\s+$/g, '') // trim leading/trailing white space
    str = str.toLowerCase() // convert string to lowercase
    str = str
        .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // remove consecutive hyphens
    return str
}

/**
 * Validates if a string is a valid URL
 * @param urlString - String to validate as URL
 * @returns True if valid URL, false otherwise
 */
export const isValidUrl = (urlString: string): boolean => {
    return new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ).test(urlString)
}
