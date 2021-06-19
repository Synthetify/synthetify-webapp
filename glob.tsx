import process from 'process'
import { Buffer } from 'buffer'
import EventEmitter from 'events'
console.log('1')
window.Buffer = Buffer
window.process = process
window.EventEmitter = EventEmitter
