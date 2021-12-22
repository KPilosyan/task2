'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GoogleBooks', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      selfLink: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      authors: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      publishedDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      pageCount: {
        type: Sequelize.INTEGER
      },
      printType: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      averageRating: {
        type: Sequelize.INTEGER
      },
      ratingsCount: {
        type: Sequelize.INTEGER
      },
      maturityRating: {
        type: Sequelize.STRING
      },
      imageLink: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      previewLink: {
        type: Sequelize.STRING
      },
      infoLink: {
        type: Sequelize.STRING
      },
      canonicalVolumeLink: {
        type: Sequelize.STRING
      },
      saleInfo_country: {
        type: Sequelize.STRING
      },
      saleability: {
        type: Sequelize.STRING
      },
      isEbook: {
        type: Sequelize.BOOLEAN
      },
      accessInfo_country: {
        type: Sequelize.STRING
      },
      viewability: {
        type: Sequelize.STRING
      },
      publicDomain: {
        type: Sequelize.BOOLEAN
      },
      textToSpeechPermission: {
        type: Sequelize.STRING
      },
      download_epub: {
        type: Sequelize.BOOLEAN
      },
      pdf: {
        type: Sequelize.BOOLEAN
      },
      webReaderLink: {
        type: Sequelize.STRING
      },
      accessViewStatus: {
        type: Sequelize.STRING
      },
      quoteSharingAllowed: {
        type: Sequelize.BOOLEAN
      },
      textSnippet: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('GoogleBooks');
  }
};