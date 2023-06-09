const { check} = require('express-validator');
const validatorMiddleware=require('../../middlewares/validatorMiddleware.js');
const userModel=require('../../models/userModel.js')
const produitModel=require('../../models/produitModel.js')
exports.getaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];

exports.createaffecterProduitValidator=[
    check('quantite').notEmpty().withMessage('quantite required').isNumeric().withMessage('quantite must be Number'),
    check('id_superviseur').optional().isMongoId().withMessage('Invalid superviseur id ')
    .custom((id_superviseur) =>
    userModel.findOne({_id:id_superviseur,role:"superviseur"}).then((superviseur) => {
              if (!superviseur) {
                return Promise.reject(
                  new Error(`No superviseur for this id : ${id_superviseur}`)
                );
              }
            })
          ),
    check('id_technicien').optional().isMongoId().withMessage('Invalid  technicien id ')
    .custom((id_technicien) =>
    userModel.findOne({_id:id_technicien,role:"technicien"}).then((technicien) => {
              if (!technicien) {
                return Promise.reject(
                  new Error(`No technicien for this id: ${id_technicien}`)
                );
              }
            })
          ),
    check('id_produit').isMongoId().withMessage('Invalid  produit id ') 
    .custom((id_produit) =>
    produitModel.findById(id_produit).then((produit) => {
              if (!produit) {
                return Promise.reject(
                  new Error(`No produit for this id: ${id_produit}`)
                );
              }
            })
          ),


      
    validatorMiddleware,
];

exports.updateaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];

exports.deleteaffecterProduitValidator=[
    check('id').isMongoId().withMessage('Invalid affecterProduit id format'),
    validatorMiddleware,
];
