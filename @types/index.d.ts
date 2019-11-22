declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'vue-codemirror';
declare module '@common/util';
interface Window {
    io: Function;
    headerbox: HeaderBox;
}
interface HeaderBox {
    setText: Function;
}
interface process {}
