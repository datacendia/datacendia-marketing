import os
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer


class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)

        if os.path.isdir(path):
            for index in ("index.html", "index.htm"):
                index_path = os.path.join(path, index)
                if os.path.exists(index_path):
                    path = index_path
                    break
            else:
                return super().send_head()

        ctype = self.guess_type(path)

        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        try:
            fs = os.stat(path)  # avoid os.fstat(f.fileno()) WinError 87 on some setups
            self.send_response(200)
            self.send_header("Content-type", ctype)
            self.send_header("Content-Length", str(fs.st_size))
            self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
            self.end_headers()
            return f
        except Exception:
            f.close()
            raise


def main() -> None:
    port = int(os.environ.get("PORT", "8002"))
    host = os.environ.get("HOST", "127.0.0.1")

    with TCPServer((host, port), Handler) as httpd:
        print(f"Serving on http://{host}:{port}/")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
