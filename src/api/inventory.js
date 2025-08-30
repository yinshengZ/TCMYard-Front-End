import request from "@/utils/request";

export function add_item(data) {
  return request({
    url: "/inventory",
    method: "post",
    data,
  });
}

export function delete_item(data) {
  return request({
    url: "/inventory/" + data,
    method: "delete",
  });
}

export function get_all() {
  return request({
    url: "/inventory",
    method: "get",
  });
}

export function get_single(data) {
  return request({
    url: "/inventory/" + data,
    method: "get",
  });
}

export function add_inventory_stock(data) {
  return request({
    url: "/inventory/stocking",
    method: "post",
    data,
  });
}

export function get_stock(id) {
  return request({
    url: "/inventory/usage/" + id,
    method: "get",
  });
}

export function get_herbs() {
  return request({
    url: "/inventory/herb",
    method: "get",
  });
}

export function get_services() {
  return request({
    url: "/inventory/service",
    method: "get",
  });
}

export function get_retails() {
  return request({
    url: "/inventory/retail",
    method: "get",
  });
}

export function get_others() {
  return request({
    url: "/inventory/other",
    method: "get",
  });
}

export function update_inventory(data, id) {
  return request({
    url: "/inventory/" + id,
    method: "put",
    data,
  });
}

export function get_expirying() {
  return request({
    url: "/inventory/expirying",
    method: "get",
  });
}

export function get_most_used(quantity, year) {
  return request({
    url: "/inventory/most_used/" + quantity + "/" + year,
    method: "get",
  });
}

export function get_all_inventory_used_years() {
  return request({
    url: "/inventory/used_years/",
    method: "get",
  });
}

export function get_inventory_used_years(id) {
  return request({
    url: "/inventory/used_years/" + id,
    method: "get",
  });
}

export function get_inventory_usage_counts(id, year) {
  return request({
    url: "/inventory/usage_counts/" + id + "/" + year,
    method: "get",
  });
}

export function get_inventoy_usage_units(id, year) {
  return request({
    url: "/inventory/usage_units/" + id + "/" + year,
    method: "get",
  });
}

export function get_most_quantity_used(quantity, year) {
  return request({
    url: "/inventory/most_quantity/" + quantity + "/" + year,
    method: "get",
  });
}

export function get_lowest_stocks() {
  return request({
    url: "/inventory/lowest_stocks",
    method: "get",
  });
}
