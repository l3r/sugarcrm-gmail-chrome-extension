/**
 * @fileoverview SugarCRM module record model.
 */


goog.provide('ydn.crm.sugar.model.Field');
goog.require('ydn.crm.sugar.Record');
goog.require('ydn.crm.sugar.gdata');



/**
 * SugarCRM module record model.
 * @param {ydn.crm.sugar.model.Group} parent
 * @param {string} field name
 * @constructor
 * @struct
 */
ydn.crm.sugar.model.Field = function(parent, field) {
  /**
   * @final
   * @protected
   * @type {ydn.crm.sugar.model.Group}
   */
  this.parent = parent;
  /**
   * @final
   * @protected
   * @type {string}
   */
  this.field_name = field;
  goog.asserts.assertObject(this.parent.getFieldInfo(this.field_name),
      this.field_name + ' in ' + parent.getModuleName());
};


/**
 * @return {string}
 */
ydn.crm.sugar.model.Field.prototype.getFieldName = function() {
  return this.field_name;
};


/**
 * Get module info.
 * @return {SugarCrm.ModuleField}
 */
ydn.crm.sugar.model.Field.prototype.getFieldInfo = function() {
  return this.parent.getFieldInfo(this.field_name);
};


/**
 * @return {string?}
 */
ydn.crm.sugar.model.Field.prototype.getFieldValue = function() {
  var record = this.parent.getRecord();
  return record ? record.value(this.field_name) : null;
};


/**
 * @return {!Object.<SugarCrm.NameValue>}
 */
ydn.crm.sugar.model.Field.prototype.getOptions = function() {
  var info = this.getFieldInfo();
  return info.options || {};
};


/**
 * @return {string}
 */
ydn.crm.sugar.model.Field.prototype.getLabel = function() {
  var info = this.getFieldInfo();
  return goog.isString(info.label) ? info.label.replace(/:$/, '') : info.label;
};


/**
 * @return {string} default to 'varchar'
 */
ydn.crm.sugar.model.Field.prototype.getType = function() {
  var info = this.getFieldInfo();
  return info.type || 'varchar';
};


/**
 * @const
 * @type {!Array.<string>}
 */
ydn.crm.sugar.model.Field.NORMALLY_HIDE = ['full_name', 'converted', 'date_entered', 'date_modified',
  'modified_user_id', 'modified_by_name', 'created_by', 'created_by_name', 'deleted', 'account_id',
  'email_and_name1', 'invalid_email', 'team_id',
  'team_set_id', 'team_count', 'assigned_user_id', 'preferred_language', 'status', 'id'];


/**
 * List of normally hide group names.
 * @const
 * @type {Array.<string>}
 */
ydn.crm.sugar.model.Field.NORMALLY_SHOW = ['name', 'email'];


/**
 * Return default setting.
 * @param {string} name group name.
 * @return {boolean}
 */
ydn.crm.sugar.model.Field.isNormallyHide = function(name) {
  return ydn.crm.sugar.model.Field.NORMALLY_SHOW.indexOf(name) == -1;
};


/**
 * Get user setting.
 * @return {*}
 */
ydn.crm.sugar.model.Field.prototype.getUserSetting = function() {
  var setting = this.parent.getUserSetting();
  return goog.isObject(setting) ? goog.object.getValueByKeys(setting, ['fields', this.field_name]) : null;
};


/**
 * @return {boolean}
 */
ydn.crm.sugar.model.Field.prototype.isNormallyHide = function() {
  var setting = this.getUserSetting();
  return setting ? !!setting['normallyHide'] : ydn.crm.sugar.model.Field.isNormallyHide(this.field_name);
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.sugar.model.Field.prototype.toString = function() {
    return this.parent + ';Field:' + this.field_name;
  };
}