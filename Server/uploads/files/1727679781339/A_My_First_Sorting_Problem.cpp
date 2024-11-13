import java.util.*

fun main() {
    val scanner = Scanner(System.`in`)
    val t = scanner.nextInt()

    repeat(t) {
        val x = scanner.nextLong()
        val y = scanner.nextLong()
        println("${minOf(x, y)} ${maxOf(x, y)}")
    }
}