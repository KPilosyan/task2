import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class GoogleBook extends Model {
    @Column
    id: string;
    @Column
    selfLink: string;
    @Column
    title: string;
    @Column
    authors: string;
    @Column
    publisher: string;
    @Column
    publishedDate: Date;
    @Column
    description: string;
    @Column
    pageCount: number;
    @Column
    printType: string;
    @Column
    categories: string;
    @Column
    averageRating: number;
    @Column
    ratingsCount: number;
    @Column
    maturityRating: string;
    @Column
    imageLink: string;
    @Column
    language: string;
    @Column
    previewLink: string;
    @Column
    infoLink: string;
    @Column
    canonicalVolumeLink: string;
    @Column
    saleInfo_country: string;
    @Column
    saleability: string;
    @Column
    isEbook: boolean;
    @Column
    accessInfo_country: string;
    @Column
    viewability: string;
    @Column
    publicDomain: boolean;
    @Column
    textToSpeechPermission: string;
    @Column
    download_epub: boolean;
    @Column
    pdf: boolean;
    @Column
    webReaderLink: string;
    @Column
    accessViewStatus: string;
    @Column
    quoteSharingAllowed: boolean;
    @Column
    textSnippet: string;
}

