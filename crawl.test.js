import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl";

test('normalizeURL protocol', () => {
    const input = 'https://blog.my.website/path'
    const actual = normalizeURL(input)
    const expected = 'blog.my.website/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
    const input = 'https://blog.my.website/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.my.website/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL caps', () => {
    const input = 'https://BLOG.my.website/path'
    const actual = normalizeURL(input)
    const expected = 'blog.my.website/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://blog.my.website/path'
    const actual = normalizeURL(input)
    const expected = 'blog.my.website/path'
    expect(actual).toEqual(expected)
})