from werkzeug.datastructures import FileStorage
from flask import Flask, request, jsonify, make_response
from radicale import config, ical, Application as Radicale
app = Flask(__name__)
radicale_app = Radicale()  # uses /etc/config/radicale


@app.route('/import', methods=['POST'])
def post_import():
    imported = handle_import(select_collection(get_path()))
    return jsonify(status='ok', imported=imported)


@app.route('/export')
def get_export():
    collection = select_collection(get_path())
    response = make_response(collection.text)
    response.headers["Content-Disposition"] = "attachment; filename=%s" % collection.name
    response.headers["Content-Type"] = collection.mimetype
    return response


def get_path():
    from werkzeug.exceptions import BadRequestKeyError
    try:
        path = request.args['path']
    except BadRequestKeyError:
        path = request.form['path']
    return path[len(config.get("server", "base_prefix").rstrip('/')):] if isinstance(path, str) else None


def select_collection(path):
    user = request.environ.get("REMOTE_USER")  # only supporting sandstorm
    items = ical.Collection.from_path(path, request.environ.get("HTTP_DEPTH", "0"))

    collection_to_use = \
        radicale_app.collect_allowed_items(items, user)[1]  # second item is writable collections
    assert len(collection_to_use) > 0

    collection_to_use = collection_to_use[0]
    assert isinstance(collection_to_use, ical.Collection)

    return collection_to_use


def handle_import(collection_to_import):
    importFile = request.files['file']
    assert isinstance(importFile, FileStorage)
    fileContents = importFile.stream.read().decode('utf-8')

    items_in_collection = len(collection_to_import.items)
    collection_to_import.append(None, fileContents)

    return len(collection_to_import.items) - items_in_collection

wsgi_app = app.wsgi_app
if __name__ == '__main__':
    app.run()